import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import {
    GetConsumerApiOperationDocumentation,
    GetConsumerApiResponseDocumentation,
} from './user.swagger';

@ApiCookieAuth('access_token')
@Controller('user')
export class UserController {
    @ApiOperation(GetConsumerApiOperationDocumentation)
    @ApiResponse(GetConsumerApiResponseDocumentation)
    @RequireRoles()
    @Get()
    public getConsumer(@User() user: UserEntity) {
        return user;
    }
}
