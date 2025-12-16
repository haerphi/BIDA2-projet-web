import { LoanEntity } from '@loan/models';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, IsNull, LessThan, Not, Repository } from 'typeorm';
import { BookService } from '@book/services';
import { UserService } from '@user/services';
import {
    AreNotFriendException,
    BookNotAvailableException,
    NotFoundException,
} from '@common/exceptions';
import { FriendService } from '@friend/services';
import { LoanGetListQueryDto } from '@loan/dtos/loan-get-list-query.dto';
import { BorrowGetListQueryDto } from '@loan/dtos/borrow-get-list-query.dto';
import { LoanStatusEnum } from '@loan/enums';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(LoanEntity)
        private readonly loanRepository: Repository<LoanEntity>,

        @Inject(forwardRef(() => BookService))
        private readonly bookService: BookService,

        private readonly userService: UserService,
        private readonly friendService: FriendService,
    ) {}

    async getLastLoansForBooks(bookIds: string[]): Promise<LoanEntity[]> {
        return this.loanRepository
            .createQueryBuilder('loan')
            .leftJoinAndSelect('loan.book', 'book')
            .where('loan.book_id IN (:...bookIds)', { bookIds })
            .andWhere(
                'loan.returned_at IS NULL OR loan.returned_at = (SELECT MAX(returned_at) FROM loans WHERE book_id = loan.book_id)',
            )
            .getMany();
    }

    async getActiveLoansByUser(
        userId: string,
        withUserId: string | null = null,
    ): Promise<LoanEntity[]> {
        const where = {
            borrower: {
                userId,
            },
            returnedAt: IsNull(),
        };

        if (withUserId) {
            Object.assign(where, {
                book: {
                    owner: {
                        userId: withUserId,
                    },
                },
            });
        }

        return this.loanRepository.find({
            where,
            relations: {
                book: {
                    owner: true,
                },
                borrower: true,
            },
        });
    }

    async createLoan(
        bookId: string,
        loanerId: string,
        borrowerId: string,
        returnDate: Date,
    ): Promise<LoanEntity> {
        const areFriends = await this.friendService.areFriends(
            loanerId,
            borrowerId,
        );
        if (!areFriends) {
            throw new AreNotFriendException();
        }

        const [book, borrower] = await Promise.all([
            this.bookService.getBookById(bookId, loanerId),
            this.userService.findById(borrowerId),
        ]);

        const lastLoans = await this.getLastLoansForBooks([bookId]);
        const lastLoan = lastLoans.find((loan) => loan.book.bookId === bookId);
        if (lastLoan && !lastLoan.returnedAt) {
            throw new BookNotAvailableException();
        }

        const loan = this.loanRepository.create({
            book,
            borrower,
            shouldBeReturnedAt: returnDate,
        });

        await this.loanRepository.save(loan);

        return loan;
    }

    async returnLoan(
        loanId: string,
        requesterId?: string,
    ): Promise<LoanEntity> {
        const where = {
            loanId,
        };

        if (requesterId) {
            where['book'] = {
                owner: {
                    userId: requesterId,
                },
            };
        }

        const loan = await this.loanRepository.findOne({
            where,
            relations: {
                book: {
                    owner: true,
                },
                borrower: true,
            },
        });

        if (!loan) {
            throw new NotFoundException();
        }

        loan.returnedAt = new Date();

        await this.loanRepository.save(loan);

        return loan;
    }

    async getLoanedBooks(
        ownerId: string,
        filters: LoanGetListQueryDto,
    ): Promise<{ total: number; loans: LoanEntity[] }> {
        const where = {
            book: {
                owner: {
                    userId: ownerId,
                },
            },
        };

        if (filters.bookId) {
            Object.assign(where, {
                book: {
                    bookId: filters.bookId,
                },
            });
        }

        if (filters.borrowerId) {
            Object.assign(where, {
                borrower: {
                    userId: filters.borrowerId,
                },
            });
        }

        if (filters.status) {
            switch (filters.status) {
                case LoanStatusEnum.InProgress:
                    Object.assign(where, {
                        returnedAt: IsNull(),
                    });
                    break;
                case LoanStatusEnum.Returned:
                    Object.assign(where, {
                        returnedAt: Not(IsNull()),
                    });
                    break;
                case LoanStatusEnum.Overdue:
                    Object.assign(where, {
                        returnedAt: IsNull(),
                        shouldBeReturnedAt: And(
                            LessThan(new Date()),
                            Not(IsNull()),
                        ),
                    });
                    break;
                default:
                    break;
            }
        }

        // Pagination
        const skip = filters.page * filters.limit - filters.limit; // because page starts at 1
        const take = filters.limit;

        const order = {};
        if (filters.orderBy) {
            order[filters.orderBy] = filters.orderDirection || 'ASC';
        }

        const loansPromise = this.loanRepository.find({
            where,
            skip,
            take,
            order,
            relations: {
                book: {
                    owner: true,
                },
                borrower: true,
            },
        });

        const totalPromise = this.loanRepository.count({ where });

        const [loans, total] = await Promise.all([loansPromise, totalPromise]);
        return { total, loans };
    }

    async getBorrowedBooks(
        ownerId: string,
        filters: BorrowGetListQueryDto,
    ): Promise<{ total: number; loans: LoanEntity[] }> {
        const where = {
            borrower: {
                userId: ownerId,
            },
        };

        if (filters.bookId) {
            Object.assign(where, {
                book: {
                    bookId: filters.bookId,
                },
            });
        }

        if (filters.loanerId) {
            Object.assign(where, {
                book: {
                    owner: {
                        userId: filters.loanerId,
                    },
                },
            });
        }

        // Pagination
        const skip = filters.page * filters.limit - filters.limit; // because page starts at 1
        const take = filters.limit;

        const order = {};
        if (filters.orderBy) {
            order[filters.orderBy] = filters.orderDirection || 'ASC';
        }

        const loansPromise = this.loanRepository.find({
            where,
            skip,
            take,
            order,
            relations: {
                book: {
                    owner: true,
                },
                borrower: true,
            },
        });

        const totalPromise = this.loanRepository.count({ where });

        const [loans, total] = await Promise.all([loansPromise, totalPromise]);
        return { total, loans };
    }
}
