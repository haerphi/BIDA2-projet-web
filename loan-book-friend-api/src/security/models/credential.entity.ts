import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'user/models/user.entity';

@Entity('credential')
export class CredentialEntity {
    @PrimaryGeneratedColumn('uuid')
    credential_id: string;

    @OneToOne(() => UserEntity, (user) => user.credential, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user!: UserEntity;

    @Column({ nullable: false })
    password: string;

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
}
