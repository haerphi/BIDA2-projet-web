import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, BookEntityWithAvailability } from '@book/models';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { UserEntity } from '@user/models';
import { NotFoundException } from '@common/exceptions';
import { BookGetListQueryDto } from '@book/dtos';
import { BookAvailability } from '@book/enums';
import { LoanEntity } from '@loan/models';
import { LoanService } from '@loan/services';
import { executePagination } from '@utils/repository.utils';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,

        @Inject(forwardRef(() => LoanService))
        private readonly loanService: LoanService,
    ) {}

    async createBook(
        owner: UserEntity,
        book: Partial<BookEntity>,
    ): Promise<BookEntity> {
        book.owner = owner;
        const newBook = await this.bookRepository.save(book);
        return newBook;
    }

    async updateBook(
        owner: UserEntity,
        book_id: string,
        book: Partial<BookEntity>,
    ): Promise<BookEntity> {
        const existingBook = await this.bookRepository.findOne({
            where: { bookId: book_id, owner: { userId: owner.userId } },
        });
        if (!existingBook) {
            throw new NotFoundException('book_not_found_exception');
        }
        const updatedBook = Object.assign(existingBook, book);
        return this.bookRepository.save(updatedBook);
    }

    async getBooks(
        filters: BookGetListQueryDto,
    ): Promise<{ total: number; books: BookEntity[] }> {
        const where = {};

        if (filters.title) {
            where['title'] = ILike(filters.title + '%');
        }

        if (filters.author) {
            where['author'] = ILike(filters.author + '%');
        }

        if (filters.condition) {
            where['condition'] = filters.condition;
        }

        // Pagination
        const skip = filters.page * filters.limit - filters.limit; // because page starts at 1
        const take = filters.limit;

        const order = {};
        if (filters.orderBy) {
            order[filters.orderBy] = filters.orderDirection || 'ASC';
        }

        const books = await this.bookRepository.find({
            where,
            skip,
            take,
            order,
        });
        const total = await this.bookRepository.count({ where });
        return Promise.resolve({ total, books });
    }

    async getBooksOwnedBy(
        filters: BookGetListQueryDto,
        owner_id: string,
    ): Promise<{ total: number; books: BookEntityWithAvailability[] }> {
        // Initialisation du QueryBuilder
        let query = this.bookRepository
            .createQueryBuilder('book')
            .leftJoin('book.owner', 'owner');

        // 1. Jointure du dernier prêt (méthode préférée pour ne pas rompre l'hydratation)
        const lastLoanSubQuery = this.bookRepository.manager
            .getRepository(LoanEntity)
            .createQueryBuilder('loan_sub')
            .select('loan_sub.*')
            .distinctOn(['loan_sub.book_id'])
            .orderBy('loan_sub.book_id', 'ASC')
            .addOrderBy('loan_sub.created_at', 'DESC');

        // Jointure du dernier prêt comme une table dérivée sous l'alias 'lastLoan'
        query = query.leftJoin(
            `(${lastLoanSubQuery.getSql()})`,
            'lastLoan', // Nouvel alias pour éviter le conflit avec l'alias 'loan' de la sous-requête précédente
            `book.book_id = "lastLoan"."book_id"`,
        );

        // 2. Ajouter la colonne calculée d'availability
        // Laissez TypeORM sélectionner toutes les colonnes de 'book' implicitement.
        // Utilisez 'addSelect' pour ajouter votre colonne calculée.
        query = query.addSelect(
            `CASE
            WHEN "lastLoan"."loan_id" IS NOT NULL AND "lastLoan"."returned_at" IS NULL AND "lastLoan"."should_be_returned_at" < CURRENT_DATE THEN 'overdue'
            WHEN "lastLoan"."loan_id" IS NOT NULL AND "lastLoan"."returned_at" IS NULL THEN 'loaned'
            ELSE 'available'
        END`,
            'availability', // L'alias du résultat brut
        );

        // 3. Condition WHERE principale
        query = query.where('owner.userId = :ownerId', { ownerId: owner_id });

        // Conditions de filtrage
        if (filters.title) {
            // Utilisation de la méthode 'andWhere' pour ajouter des conditions
            // Le filtre ILike('%...') est géré avec un paramètre et le signe %
            query = query.andWhere('book.title ILIKE :title', {
                title: `${filters.title}%`,
            });
        }

        if (filters.author) {
            query = query.andWhere('book.author ILIKE :author', {
                author: `${filters.author}%`,
            });
        }

        if (filters.condition) {
            query = query.andWhere('book.condition = :condition', {
                condition: filters.condition,
            });
        }

        if (filters.availability) {
            switch (filters.availability) {
                case BookAvailability.Available:
                    // Disponibilité: Le dernier prêt est retourné OU il n'y a pas de prêt du tout
                    query.andWhere(
                        '("lastLoan"."returned_at" IS NOT NULL OR "lastLoan"."loan_id" IS NULL)',
                    );
                    break;

                case BookAvailability.Loaned:
                    // Prêté: Le dernier prêt n'est pas retourné ET n'est pas en retard
                    query.andWhere(
                        '("lastLoan"."returned_at" IS NULL AND "lastLoan"."should_be_returned_at" >= CURRENT_DATE)',
                    );
                    break;

                case BookAvailability.Overdue:
                    // En retard: Le dernier prêt n'est pas retourné ET est en retard
                    query.andWhere(
                        '"lastLoan"."returned_at" IS NULL AND "lastLoan"."should_be_returned_at" < CURRENT_DATE',
                    );
                    break;
            }
        }

        const [total, result] = await Promise.all(
            executePagination<BookEntity>(query, filters),
        );

        const bookWithAvailability: BookEntityWithAvailability[] =
            result.entities.map((b, index) => ({
                ...b,
                availability:
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    result.raw[index].availability as BookAvailability,
            }));

        return {
            total,
            books: bookWithAvailability,
        };
    }

    async getBookById(bookId: string, userId?: string): Promise<BookEntity> {
        const where: FindOptionsWhere<BookEntity> = { bookId };
        if (userId) {
            where.owner = { userId };
        }

        const book = await this.bookRepository.findOne({ where });

        if (!book) {
            throw new NotFoundException('book_not_found_exception');
        }

        return book;
    }

    async getBookDetailsById(
        bookId: string,
        requester?: UserEntity,
    ): Promise<BookEntityWithAvailability> {
        // Initialisation du QueryBuilder
        const book: BookEntity | null = await this.bookRepository.findOne({
            where: { bookId },
            relations: {
                owner: true,
                loans: {
                    book: true,
                    borrower: true,
                },
            },
        });

        if (!book) {
            throw new NotFoundException('book_not_found_exception');
        }

        const availability = await this.getBookAvailability(book.bookId);

        return {
            ...book,
            availability,
        };
    }

    private async getBookAvailability(
        bookId: string,
    ): Promise<BookAvailability> {
        const lastLoan = await this.loanService.getLastLoanForBook(bookId);

        if (!lastLoan || lastLoan.returnedAt) {
            return BookAvailability.Available;
        }

        const now = new Date();
        if (lastLoan.shouldBeReturnedAt && lastLoan.shouldBeReturnedAt < now) {
            return BookAvailability.Overdue;
        }

        return BookAvailability.Loaned;
    }
}
