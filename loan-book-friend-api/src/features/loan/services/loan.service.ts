import { BookService } from '@book/services';
import { AreNotFriendException, NotFoundException } from '@common/exceptions';
import { FriendService } from '@friend/services';
import { LoanEntity } from '@loan/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@user/services';
import { Repository } from 'typeorm';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(LoanEntity)
        private readonly loanRepository: Repository<LoanEntity>,
        private readonly userService: UserService,
        private readonly bookService: BookService,
        private readonly friendService: FriendService,
    ) {}

    async createLoan(
        lenderId: string,
        bookId: string,
        borrowerId: string,
    ): Promise<LoanEntity> {
        const isFriend = await this.friendService.isFriend(
            lenderId,
            borrowerId,
        );

        if (!isFriend) {
            throw new AreNotFriendException();
        }

        const borrower = await this.userService.findById(borrowerId);
        const book = await this.bookService.findById(bookId, lenderId);

        const loan = this.loanRepository.create({
            book: book,
            borrower: borrower,
        });

        return this.loanRepository.save(loan);
    }

    async getAllLoans(
        userId: string,
        asBorrower?: boolean,
        asLender?: boolean,
        page?: number,
        limit?: number,
    ): Promise<LoanEntity[]> {
        const requester = await this.userService.findById(userId);

        const queryBuilder = this.loanRepository
            .createQueryBuilder('loan')
            .leftJoinAndSelect('loan.book', 'book')
            .leftJoinAndSelect('loan.borrower', 'borrower')
            .leftJoinAndSelect('book.owner', 'lender');

        if (asBorrower) {
            queryBuilder.andWhere('borrower.user_id = :requesterId', {
                requesterId: requester.user_id,
            });
        }

        if (asLender) {
            queryBuilder.andWhere('lender.user_id = :requesterId', {
                requesterId: requester.user_id,
            });
        }

        if (page !== undefined && limit !== undefined) {
            queryBuilder.skip((page - 1) * limit).take(limit);
        }

        return queryBuilder.getMany();
    }

    async returnLoan(ownerId: string, loanId: string): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({
            where: {
                loanId: loanId,
                book: {
                    owner: { user_id: ownerId },
                },
            },
            relations: ['book', 'borrower'],
        });

        if (!loan) {
            throw new NotFoundException('loan_not_found');
        }

        loan.returnedAt = new Date();
        return this.loanRepository.save(loan);
    }
}
