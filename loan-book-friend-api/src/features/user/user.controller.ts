import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequireRoles } from '../security/guards';
import { User } from '../security/metadata';
import { UserEntity } from './models';
import {
    DeleteSelfApiOperationDocumentation,
    DeleteSelfApiResponseDocumentation,
    DeleteUserApiOperationDocumentation,
    DeleteUserApiResponseDocumentation,
    GetAllUsersApiOperationDocumentation,
    GetAllUsersApiResponseDocumentation,
    GetConsumerApiOperationDocumentation,
    GetConsumerApiResponseDocumentation,
    GetUserByIdApiOperationDocumentation,
    GetUserByIdApiResponseDocumentation,
    updateSelfApiOperationDocumentation,
    updateSelfApiResponseDocumentation,
    updateUserApiOperationDocumentation,
    updateUserApiResponseDocumentation,
} from './user.swagger';
import { UserRole } from '../security/enums';
import { UserService } from './services/user.service';
import type { UserDetailsDto, UserListDto, UserUpdateDto } from './dtos';
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

    @ApiOperation(DeleteSelfApiOperationDocumentation)
    @ApiResponse(DeleteSelfApiResponseDocumentation)
    @RequireRoles()
    @Delete('')
    public async deleteSelf(@User() user: UserEntity): Promise<void> {
        await this.userService.delete(user.user_id);
    }

    @ApiOperation(DeleteUserApiOperationDocumentation)
    @ApiResponse(DeleteUserApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Delete(':id')
    public async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.delete(id);
    }

    @ApiOperation(updateSelfApiOperationDocumentation)
    @ApiResponse(updateSelfApiResponseDocumentation)
    @RequireRoles()
    @Put('')
    public async updateSelf(
        @User() user: UserEntity,
        @Body() data: Partial<UserUpdateDto>,
    ): Promise<void> {
        await this.userService.update(user.user_id, data, user);
    }

    @ApiOperation(updateUserApiOperationDocumentation)
    @ApiResponse(updateUserApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Put(':id')
    public async updateUser(
        @Param('id') id: string,
        @Body() data: Partial<UserUpdateDto>,
        @User() requester: UserEntity,
    ): Promise<void> {
        await this.userService.update(id, data, requester);
    }
}
