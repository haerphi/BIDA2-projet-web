import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configManager } from '@common/config/config.manager';
import { SecurityModule } from '@security/security.module';
import { UserModule } from '@user/user.module';
import { AuthMiddleware } from '@security/middlewares/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
        // Other modules can be imported here
        UserModule,
        SecurityModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
