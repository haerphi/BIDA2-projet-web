import { forwardRef, Module } from '@nestjs/common';
import { LoanController } from '@loan/loan.controller';
import { LoanService } from '@loan/services/loan.service';
import { LoanEntity } from '@loan/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user.module';
import { FriendModule } from '@friend/friend.module';
import { BookModule } from '@book/book.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LoanEntity]),
        UserModule,
        forwardRef(() => BookModule),
        forwardRef(() => FriendModule),
    ],
    providers: [LoanService],
    exports: [LoanService],
    controllers: [LoanController],
})
export class LoanModule {}
