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
import {
    ApiCookieAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
} from '@nestjs/swagger';
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
import * as Doc from './friend.swagger';

@ApiCookieAuth('access_token')
@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @RequireRoles()
    @Post()
    @ApiOperation(Doc.SendFriendRequestOperation)
    @ApiResponse(Doc.SendFriendRequestResponse)
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
    @ApiOperation(Doc.GetSentRequestsOperation)
    @ApiResponse(Doc.GetSentRequestsResponse)
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
    @ApiOperation(Doc.GetReceivedRequestsOperation)
    @ApiResponse(Doc.GetReceivedRequestsResponse)
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
    @ApiOperation(Doc.DenyFriendRequestOperation)
    @ApiParam(Doc.FriendIdParam)
    async denyFriendRequest(
        @User() user: UserEntity,
        @Param('friendId') friendId: string,
    ): Promise<void> {
        await this.friendService.denyFriendRequest(user.userId, friendId);
    }

    @RequireRoles()
    @Patch('accept-request/:friendId')
    @ApiOperation(Doc.AcceptFriendRequestOperation)
    @ApiParam(Doc.FriendIdParam)
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
    @ApiOperation(Doc.GetFriendsOperation)
    @ApiResponse(Doc.GetFriendsResponse)
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
