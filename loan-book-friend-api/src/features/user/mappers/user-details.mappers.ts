import { UserDetailsDto } from '@user/dtos';
import { UserEntity } from '@user/models';

export const toUserDetailsDto = (user: UserEntity): UserDetailsDto => {
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
