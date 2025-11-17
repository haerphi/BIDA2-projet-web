import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import {
    FriendAcceptDto,
    FriendAddDto,
    FriendGetQueryDto,
    FriendRemoveDto,
    FriendRequestDto,
    FriendRequestGetQueryDto,
} from '@friend/dtos';
import { FriendService } from '@friend/services';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
    AcceptFriendApiOperationDocumentation,
    AcceptFriendApiResponseDocumentation,
    AddFriendApiOperationDocumentation,
    AddFriendApiResponseDocumentation,
    DeleteFriendApiOperationDocumentation,
    DeleteFriendApiResponseDocumentation,
    GetFriendRequestApiOperationDocumentation,
    GetFriendRequestApiResponseDocumentation,
    GetFriendsApiOperationDocumentation,
    GetFriendsApiResponseDocumentation,
} from '@friend/friend.swagger';
import { toUserListDto } from '@user/mappers';
import { UserListDto } from '@user/dtos';
import { ToFriendRequestDto } from '@friend/mappers';
import { ListApiResponseDto } from '@common/dtos';

@ApiCookieAuth('access_token')
@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @ApiOperation(AddFriendApiOperationDocumentation)
    @ApiResponse(AddFriendApiResponseDocumentation)
    @RequireRoles()
    @Post()
    async addFriend(
        @User() requester: UserEntity,
        @Body() body: FriendAddDto,
    ): Promise<void> {
        if (!body.friend_email && !body.friend_name) {
            throw new BadRequestException(
                'At least one of friend_email or friend_name must be provided',
            );
        }

        if (body.friend_email) {
            await this.friendService.addFriendByEmail(
                requester.user_id,
                body.friend_email,
            );
        } else if (body.friend_name) {
            await this.friendService.addFriendByName(
                requester.user_id,
                body.friend_name,
            );
        }
    }

    @ApiOperation(GetFriendRequestApiOperationDocumentation)
    @ApiResponse(GetFriendRequestApiResponseDocumentation)
    @RequireRoles()
    @Get('requests')
    async getFriendRequests(
        @User() user: UserEntity,
        @Query() params: FriendRequestGetQueryDto,
    ): Promise<ListApiResponseDto<FriendRequestDto>> {
        const { requests, total } = await this.friendService.getFriendRequests(
            user.user_id,
            params,
        );
        return { data: requests.map(ToFriendRequestDto), total };
    }

    @ApiOperation(AcceptFriendApiOperationDocumentation)
    @ApiResponse(AcceptFriendApiResponseDocumentation)
    @RequireRoles()
    @Patch()
    async acceptFriend(
        @User() user: UserEntity,
        @Body() body: FriendAcceptDto,
    ): Promise<void> {
        await this.friendService.acceptFriend(
            user.user_id,
            body.new_friend_user_id,
        );
    }

    @ApiOperation(GetFriendsApiOperationDocumentation)
    @ApiResponse(GetFriendsApiResponseDocumentation)
    @RequireRoles()
    @Get()
    async getFriends(
        @User() user: UserEntity,
        @Query() params: FriendGetQueryDto,
    ): Promise<ListApiResponseDto<UserListDto>> {
        const { friends, total } = await this.friendService.getFriends(
            user.user_id,
            params,
        );
        return { total, data: friends.map(toUserListDto) };
    }

    @ApiOperation(DeleteFriendApiOperationDocumentation)
    @ApiResponse(DeleteFriendApiResponseDocumentation)
    @RequireRoles()
    @Delete()
    async removeFriend(
        @User() user: UserEntity,
        @Body() body: FriendRemoveDto,
    ): Promise<void> {
        await this.friendService.removeFriend(
            user.user_id,
            body.friend_user_id,
        );
    }
}
