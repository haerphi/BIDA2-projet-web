import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from '@security/models';
import { TokenService, SecurityService } from '@security/services';
import { UserModule } from '@user/user.module';
import { SecurityController } from '@security/security.controller';
import { JwtModule } from '@nestjs/jwt';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enums';
import { AuthMiddleware } from '@security/middlewares';

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
        consumer
            .apply(AuthMiddleware)
            .exclude('/auth/signout', '/auth/refresh')
            .forRoutes('*');
    }
}
