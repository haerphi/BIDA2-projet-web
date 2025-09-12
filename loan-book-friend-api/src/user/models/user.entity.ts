import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CredentialEntity } from '@security/models/credential.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    user_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Index('UQ_users_email', { unique: true })
    @Column({ type: 'varchar', length: 320, nullable: false })
    email: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToOne(() => CredentialEntity, (cred) => cred.user)
    credential?: CredentialEntity;
}
