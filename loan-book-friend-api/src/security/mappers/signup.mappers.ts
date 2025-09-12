import { SignUpPayload } from '@security/dtos/sign-up.dto';
import { UserEntity } from '@user/models';
import { Builder } from 'builder-pattern';

export const signupPayloadToUser = (payload: SignUpPayload): UserEntity => {
    const user = Builder<UserEntity>()
        .name(payload.name)
        .email(payload.email)
        .build();
    return user;
};
