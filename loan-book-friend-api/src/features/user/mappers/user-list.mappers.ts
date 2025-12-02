import { UserListDto, UserListWithRoleDto } from '@user/dtos';
import { UserEntity } from '@user/models';

export const toUserListDto = (user: UserEntity): UserListDto => {
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
    };
};

export const toUserListWithRoleDto = (
    user: UserEntity,
): UserListWithRoleDto => {
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
