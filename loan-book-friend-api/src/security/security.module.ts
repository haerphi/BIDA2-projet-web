import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from '@security/models/credential.entity';
import { Token } from './models/token.entity';
import { TokenService } from './services/token.service';
import { SecurityService } from './services/security.service';
import { UserModule } from '@user/user.module';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enums';

@Module({
    imports: [
        TypeOrmModule.forFeature([Credential, Token]),
        JwtModule.register({
            global: true,
            secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
            signOptions: {
                expiresIn: configManager.getValue(
                    ConfigKey.JWT_TOKEN_EXPIRE_IN,
                ),
            },
        }),
        UserModule,
    ],
    providers: [TokenService, SecurityService],
    controllers: [SecurityController],
})
export class SecurityModule {}
