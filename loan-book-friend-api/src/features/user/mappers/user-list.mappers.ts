import { UserListDto, UserListWithRoleDto } from '@user/dtos';
import { UserEntity } from '@user/models';

export const toUserListDto = (user: UserEntity): UserListDto => {
    return {
        userId: user.userId,
        name: user.name,
        email: user.email,
    };
};

export const toUserListWithRoleDto = (
    user: UserEntity,
): UserListWithRoleDto => {
    return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
