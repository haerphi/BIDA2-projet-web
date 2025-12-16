import { UserDetailsDto } from '@user/dtos';
import { UserEntity } from '@user/models';

export const toUserDetailsDto = (user: UserEntity): UserDetailsDto => {
    return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    };
};
