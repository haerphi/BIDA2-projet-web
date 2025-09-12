import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '@security/interfaces';
import { UserEntity } from '@user/models';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: RequestWithUser = ctx.switchToHttp().getRequest();
        return request.user as UserEntity;
    },
);
