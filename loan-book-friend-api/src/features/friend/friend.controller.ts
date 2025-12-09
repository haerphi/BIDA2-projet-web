import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { FriendService } from '@friend/services';
import { ApiCookieAuth } from '@nestjs/swagger';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import {
    FriendGetListDto,
    FriendGetListQueryDto,
    ReceivedFriendRequestDto,
    SendFriendRequestFormDto,
    SentFriendRequestDto,
} from '@friend/dtos';
import { NameOrEmailIsRequired } from '@common/exceptions';
import { ListApiResponseDto, PaginationQueryDto } from '@common/dtos';
import {
    friendEntityToReceivedFriendRequestDto,
    friendEntityToSentFriendRequestDto,
    friendWithCountsToFriendGetListDto,
} from '@friend/mappers';

@ApiCookieAuth('access_token')
@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @RequireRoles()
    @Post()
    async sendFriendRequest(
        @User() requester: UserEntity,
        @Body() data: SendFriendRequestFormDto,
    ): Promise<void> {
        if (!data.name && !data.email) {
            throw new NameOrEmailIsRequired();
        }

        await this.friendService.sendFriendRequest(
            requester.userId,
            data.name,
            data.email,
        );
    }

    @RequireRoles()
    @Get('sent-requests')
    async getFriendRequests(
        @User() user: UserEntity,
        @Query() filters: PaginationQueryDto,
    ): Promise<ListApiResponseDto<SentFriendRequestDto>> {
        const { total, friendRequests } =
            await this.friendService.getFriendRequestsSent(
                user.userId,
                filters,
            );
        return {
            total,
            data: friendRequests.map(friendEntityToSentFriendRequestDto),
        };
    }

    @RequireRoles()
    @Get('received-requests')
    async getReceivedFriendRequests(
        @User() user: UserEntity,
        @Query() filters: PaginationQueryDto,
    ): Promise<ListApiResponseDto<ReceivedFriendRequestDto>> {
        const { total, friendRequests } =
            await this.friendService.getFriendRequestsReceived(
                user.userId,
                filters,
            );

        return {
            total,
            data: friendRequests.map(friendEntityToReceivedFriendRequestDto),
        };
    }

    @RequireRoles()
    @Delete('deny-request/:friendId')
    async denyFriendRequest(
        @User() user: UserEntity,
        @Param('friendId') friendId: string,
    ): Promise<void> {
        await this.friendService.denyFriendRequest(user.userId, friendId);
    }

    @RequireRoles()
    @Patch('accept-request/:friendId')
    async acceptFriendRequest(
        @User() user: UserEntity,
        @Param('friendId') friendRequestId: string,
    ): Promise<void> {
        await this.friendService.acceptFriendRequest(
            user.userId,
            friendRequestId,
        );
    }

    @RequireRoles()
    @Get()
    async getFriends(
        @User() user: UserEntity,
        @Query() filters: FriendGetListQueryDto,
    ): Promise<ListApiResponseDto<FriendGetListDto>> {
        const { total, friends } = await this.friendService.getFriends(
            user.userId,
            filters,
        );
        return {
            total,
            data: friends.map(friendWithCountsToFriendGetListDto),
        };
    }
}
