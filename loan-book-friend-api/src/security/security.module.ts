import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from '@security/models';
import { TokenService } from './services/token.service';
import { SecurityService } from './services/security.service';
import { UserModule } from '@user/user.module';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enums';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([CredentialEntity]),
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
    providers: [TokenService, SecurityService, AuthMiddleware],
    controllers: [SecurityController],
})
export class SecurityModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }
}
