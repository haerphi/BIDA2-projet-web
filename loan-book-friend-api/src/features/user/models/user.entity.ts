import {
    Column,
    Entity,
    Index,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CredentialEntity } from '@security/models';
import { UserRole } from '@security/enums';
import { TrackedEntity } from '@common/models';
import { BookEntity } from '@book/models';
import { FriendEntity } from '@friend/models';
import { LoanEntity } from '@loan/models';

@Entity({ name: 'users' })
export class UserEntity extends TrackedEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    user_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Index('UQ_users_email', { unique: true })
    @Column({ type: 'varchar', length: 320, nullable: false })
    email: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
        default: UserRole.User,
    })
    role: UserRole = UserRole.User;

    @OneToOne(() => CredentialEntity, (cred) => cred.user)
    credential?: CredentialEntity;

    @OneToMany(() => BookEntity, (book) => book.owner)
    books?: BookEntity[];

    @OneToMany(() => FriendEntity, (friend) => friend.userA)
    friendsA?: FriendEntity[];

    @OneToMany(() => FriendEntity, (friend) => friend.userB)
    friendsB?: FriendEntity[];

    @OneToMany(() => LoanEntity, (loan) => loan.borrower)
    borrowedBooks?: LoanEntity[];
}
