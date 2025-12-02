import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Query,
} from '@nestjs/common';
import {
    ApiCookieAuth,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
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
import { UserRole } from '@security/enums';
import { UserService } from '@user/services';
import {
    UserDetailsDto,
    UserListDto,
    UserUpdateAdminDto,
    UserUpdateDto,
} from '@user/dtos';
import { toUserDetailsDto, toUserListDto } from '@user/mappers';
import { ListApiResponseDto, PaginationQueryDto } from '@common/dtos';

@ApiCookieAuth('access_token')
@ApiExtraModels(UserListDto)
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
    public async getAllUsers(
        @Query() query: PaginationQueryDto,
    ): Promise<ListApiResponseDto<UserListDto>> {
        const { total, users } = await this.userService.findAll(query);
        return { total, data: users.map(toUserListDto) };
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
        await this.userService.update(user.user_id, {
            name: data.name,
            email: data.email,
        });
    }

    @ApiOperation(updateUserApiOperationDocumentation)
    @ApiResponse(updateUserApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Put(':id')
    public async updateUser(
        @Param('id') id: string,
        @Body() data: Partial<UserUpdateAdminDto>,
    ): Promise<void> {
        await this.userService.update(id, data);
    }
}
