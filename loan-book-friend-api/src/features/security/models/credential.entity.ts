import { TrackedEntity } from '@common/models';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@user/models/user.entity';

@Entity('credential')
export class CredentialEntity extends TrackedEntity {
    @PrimaryGeneratedColumn('uuid')
    credential_id: string;

    @OneToOne(() => UserEntity, (user) => user.credential, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
    user!: UserEntity;

    @Column({ nullable: false })
    password: string;
}
