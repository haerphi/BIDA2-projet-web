import { BookEntity } from '@book/models';
import { TrackedEntity } from '@common/models';
import { UserEntity } from '@user/models';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'loans' })
export class LoanEntity extends TrackedEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'loan_id' })
    loanId: string;

    @ManyToOne(() => BookEntity, (book) => book.loans)
    @JoinColumn({ name: 'book_id' })
    book?: BookEntity;

    @ManyToOne(() => UserEntity, (user) => user.borrowedBooks)
    @JoinColumn({ name: 'borrower_id' })
    borrower?: UserEntity;

    @Column({
        type: 'timestamptz',
        name: 'returned_at',
        nullable: true,
        default: null,
    })
    returnedAt: Date | null;
}
