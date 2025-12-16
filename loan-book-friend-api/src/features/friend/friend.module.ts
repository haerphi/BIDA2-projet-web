import { forwardRef, Module } from '@nestjs/common';
import { FriendController } from '@friend/friend.controller';
import { FriendService } from '@friend/services/friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from '@friend/models';
import { UserEntity } from 'features/user/models';
import { LoanModule } from '@loan/loan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FriendEntity, UserEntity]),
        forwardRef(() => LoanModule),
    ],
    providers: [FriendService],
    exports: [FriendService],
    controllers: [FriendController],
})
export class FriendModule {}
