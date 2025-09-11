import { SignUpPayload } from '@security/dtos/sign-up.dto';
import { User } from '@user/models';
import { Builder } from 'builder-pattern';

export const signupPayloadToUser = (payload: SignUpPayload): User => {
    const user = Builder<User>()
        .name(payload.name)
        .email(payload.email)
        .build();
    return user;
};
