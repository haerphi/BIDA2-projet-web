import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import {
    GetAllUsersApiOperationDocumentation,
    GetAllUsersApiResponseDocumentation,
    GetConsumerApiOperationDocumentation,
    GetConsumerApiResponseDocumentation,
} from './user.swagger';
import { UserRole } from '@security/enums';
import { UserService } from './services/user.service';
import { UserListDto } from './dtos';
import { toUserListDto } from './mappers';

@ApiCookieAuth('access_token')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation(GetConsumerApiOperationDocumentation)
    @ApiResponse(GetConsumerApiResponseDocumentation)
    @RequireRoles()
    @Get()
    public getConsumer(@User() user: UserEntity) {
        return user;
    }

    @ApiOperation(GetAllUsersApiOperationDocumentation)
    @ApiResponse(GetAllUsersApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get('all')
    public async getAllUsers(): Promise<UserListDto[]> {
        const users = await this.userService.findAll();
        return users.map(toUserListDto);
    }
}
