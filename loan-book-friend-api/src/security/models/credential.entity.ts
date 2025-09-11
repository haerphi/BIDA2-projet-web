import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'user/models/user.entity';

@Entity('credential')
export class Credential {
    @PrimaryGeneratedColumn('uuid')
    credential_id: string;

    @OneToOne(() => User, (user) => user.credential, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false,
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
    user!: User;

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
