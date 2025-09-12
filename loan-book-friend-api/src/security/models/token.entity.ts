import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CredentialEntity } from './credential.entity';

@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn('uuid')
    token_id: string;
    @Column({ nullable: false })
    token: string;
    @Column({ name: 'refresh_token', nullable: false })
    refreshToken: string;
    @OneToOne(() => CredentialEntity, { eager: true })
    @JoinColumn({ name: 'credential_id' })
    credential: CredentialEntity;
}
