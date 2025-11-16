import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@user/services';
import { UserEntity } from '@user/models';
import { UserController } from '@user/user.controller';
import { SecurityModule } from '@security/security.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => SecurityModule),
    ],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
