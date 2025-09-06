import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from '@security/models/credential.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Credential])],
})
export class SecurityModule {}
