import { Controller, Get, Param } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import {
    GetAllUsersApiOperationDocumentation,
    GetAllUsersApiResponseDocumentation,
    GetConsumerApiOperationDocumentation,
    GetConsumerApiResponseDocumentation,
    GetUserByIdApiOperationDocumentation,
    GetUserByIdApiResponseDocumentation,
} from './user.swagger';
import { UserRole } from '@security/enums';
import { UserService } from './services/user.service';
import { UserDetailsDto, UserListDto } from './dtos';
import { toUserDetailsDto, toUserListDto } from './mappers';

@ApiCookieAuth('access_token')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation(GetConsumerApiOperationDocumentation)
    @ApiResponse(GetConsumerApiResponseDocumentation)
    @RequireRoles()
    @Get()
    public getConsumer(@User() user: UserEntity): UserDetailsDto {
        return toUserDetailsDto(user);
    }

    @ApiOperation(GetAllUsersApiOperationDocumentation)
    @ApiResponse(GetAllUsersApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get('all')
    public async getAllUsers(): Promise<UserListDto[]> {
        const users = await this.userService.findAll();
        return users.map(toUserListDto);
    }

    @ApiOperation(GetUserByIdApiOperationDocumentation)
    @ApiResponse(GetUserByIdApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get(':id')
    public async getUserById(@Param('id') id: string): Promise<UserDetailsDto> {
        const user = await this.userService.findById(id);
        return toUserDetailsDto(user);
    }
}
