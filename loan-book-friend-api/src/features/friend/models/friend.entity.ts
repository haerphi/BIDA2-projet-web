import { TrackedEntity } from '@common/models';
import { UserEntity } from '@user/models';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Unique,
} from 'typeorm';

@Entity({ name: 'friends' })
@Unique(['userA_id', 'userB_id'])
export class FriendEntity extends TrackedEntity {
    @PrimaryColumn('uuid', { name: 'userA_id' })
    userA_id: string;

    @PrimaryColumn('uuid', { name: 'userB_id' })
    userB_id: string;

    @ManyToOne(() => UserEntity, (user) => user.friendsA, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userA_id', referencedColumnName: 'user_id' })
    userA: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.friendsB, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userB_id', referencedColumnName: 'user_id' })
    userB: UserEntity;

    @Column({
        type: 'timestamptz',
        name: 'accepted_at',
        nullable: true,
        default: null,
    })
    acceptedAt?: Date | null;
}
