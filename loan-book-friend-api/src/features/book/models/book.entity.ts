import { TrackedEntity } from '@common/models';
import { LoanEntity } from '@loan/models';
import { UserEntity } from '@user/models';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity extends TrackedEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'book_id' })
    book_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    author: string;

    @Column({ type: 'boolean', default: true })
    available: boolean;

    @ManyToOne(() => UserEntity, (user) => user.books)
    @JoinColumn({ name: 'owner_id' })
    owner: UserEntity;

    @OneToMany(() => LoanEntity, (loan) => loan.book)
    loans: LoanEntity[];
}
