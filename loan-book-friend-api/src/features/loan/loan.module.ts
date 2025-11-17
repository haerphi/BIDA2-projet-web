import { Module } from '@nestjs/common';
import { LoanController } from '@loan/loan.controller';
import { LoanService } from '@loan/services/loan.service';
import { LoanEntity } from '@loan/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '@book/book.module';
import { UserModule } from '@user/user.module';
import { FriendModule } from '@friend/friend.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LoanEntity]),
        BookModule,
        UserModule,
        FriendModule,
    ],
    providers: [LoanService],
    exports: [LoanService],
    controllers: [LoanController],
})
export class LoanModule {}
