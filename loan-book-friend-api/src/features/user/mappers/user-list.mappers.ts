import { UserListDto } from '../dtos';
import { UserEntity } from '../models';

export const toUserListDto = (user: UserEntity): UserListDto => {
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
