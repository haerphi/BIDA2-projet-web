import { BookService } from '@book/services';
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
    ) {}

    async createLoan(
        requesterId: string,
        bookId: string,
        borrowerId: string,
    ): Promise<LoanEntity> {
        const borrower = await this.userService.findById(borrowerId);
        const book = await this.bookService.findById(bookId, requesterId);

        const loan = this.loanRepository.create({
            book: book,
            borrower: borrower,
        });

        return this.loanRepository.save(loan);
    }

    async getAllLoans(
        requesterId: string,
        asBorrower?: boolean,
        asLender?: boolean,
        page?: number,
        limit?: number,
    ): Promise<LoanEntity[]> {
        const requester = await this.userService.findById(requesterId);

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
}
