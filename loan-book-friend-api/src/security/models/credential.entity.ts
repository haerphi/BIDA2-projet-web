import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('credential')
export class Credential {
    @PrimaryColumn('uuid')
    credential_id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
