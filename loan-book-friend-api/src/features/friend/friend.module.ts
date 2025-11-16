import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './services/friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from './models';
import { UserEntity } from 'features/user/models';

@Module({
    imports: [TypeOrmModule.forFeature([FriendEntity, UserEntity])],
    providers: [FriendService],
    exports: [FriendService],
    controllers: [FriendController],
})
export class FriendModule {}
