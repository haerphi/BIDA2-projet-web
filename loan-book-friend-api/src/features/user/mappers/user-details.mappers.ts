import { UserDetailsDto } from '@user/dtos';
import { UserEntity } from '@user/models';
import { Builder } from 'builder-pattern';

export const toUserDetailsDto = (user: UserEntity): UserDetailsDto => {
    return Builder<UserDetailsDto>()
        .userId(user.userId)
        .name(user.name)
        .email(user.email)
        .role(user.role)
        .createdAt(user.created_at)
        .build();
};
