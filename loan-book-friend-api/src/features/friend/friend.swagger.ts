import {
    ApiOperationOptions,
    ApiResponseOptions,
    getSchemaPath,
} from '@nestjs/swagger';
import { UserListDto } from '@user/dtos';
import { FriendRequestDto } from '@friend/dtos';
import { ListApiResponseDto } from '@common/dtos';

// addFriend
export const AddFriendApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Send a friend request',
    description:
        'This route allows the connected user to send a friend request to another user',
};

export const AddFriendApiResponseDocumentation: ApiResponseOptions = {
    status: 201,
    description: 'The friend request has been sent successfully',
};

// getFriendRequests
export const GetFriendRequestApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get friend requests',
    description:
        'This route allows the connected user to get their pending friend requests',
};

export const GetFriendRequestApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description:
        'List of friend requests (for some reason swagger dont get the right object type)',
    schema: {
        allOf: [
            {
                $ref: getSchemaPath(ListApiResponseDto),
            },
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(FriendRequestDto) },
                    },
                    total: {
                        type: 'number',
                    },
                },
            },
        ],
    },
};

// acceptFriend
export const AcceptFriendApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Accept a friend request',
    description:
        'This route allows the connected user to accept a friend request',
};

export const AcceptFriendApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The friend request has been accepted successfully',
};

// getFriends
export const GetFriendsApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get friends list',
    description:
        'This route allows the connected user to get their friends list',
};

export const GetFriendsApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of friends',
    schema: {
        allOf: [
            {
                $ref: getSchemaPath(ListApiResponseDto),
            },
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(UserListDto) },
                    },
                    total: {
                        type: 'number',
                    },
                },
            },
        ],
    },
};

// deleteFriend
export const DeleteFriendApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Remove a friend',
    description: 'This route allows the connected user to remove a friend',
};

export const DeleteFriendApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The friend has been removed successfully',
};
