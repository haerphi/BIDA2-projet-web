import { Module } from '@nestjs/common';
import { FriendController } from '@friend/friend.controller';
import { FriendService } from '@friend/services/friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from '@friend/models';
import { UserEntity } from 'features/user/models';

@Module({
    imports: [TypeOrmModule.forFeature([FriendEntity, UserEntity])],
    providers: [FriendService],
    exports: [FriendService],
    controllers: [FriendController],
})
export class FriendModule {}
