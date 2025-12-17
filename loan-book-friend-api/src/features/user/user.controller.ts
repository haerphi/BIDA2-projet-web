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
import {
    DeleteUserApiOperationDocumentation,
    DeleteUserApiResponseDocumentation,
    GetAllUsersApiOperationDocumentation,
    GetAllUsersApiResponseDocumentation,
    GetUserByIdApiOperationDocumentation,
    GetUserByIdApiResponseDocumentation,
    updateUserApiOperationDocumentation,
    updateUserApiResponseDocumentation,
} from './user.swagger';
import { UserRole } from '@security/enums';
import { UserService } from '@user/services';
import {
    UserDetailsDto,
    UserListDto, UserListWithRoleDto,
    UserUpdateAdminDto,
} from '@user/dtos';
import {toUserDetailsDto, toUserListWithRoleDto} from '@user/mappers';
import { ListApiResponseDto, PaginationQueryDto } from '@common/dtos';

@ApiCookieAuth('access_token')
@ApiExtraModels(UserListDto)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation(GetAllUsersApiOperationDocumentation)
    @ApiResponse(GetAllUsersApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get('all')
    public async getAllUsers(
        @Query() query: PaginationQueryDto,
    ): Promise<ListApiResponseDto<UserListWithRoleDto>> {
        const { total, users } = await this.userService.findAll(query);
        return { total, data: users.map(toUserListWithRoleDto) };
    }

    @ApiOperation(GetUserByIdApiOperationDocumentation)
    @ApiResponse(GetUserByIdApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get(':id')
    public async getUserById(@Param('id') id: string): Promise<UserDetailsDto> {
        const user = await this.userService.findById(id);
        return toUserDetailsDto(user);
    }

    @ApiOperation(DeleteUserApiOperationDocumentation)
    @ApiResponse(DeleteUserApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Delete(':id')
    public async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.delete(id);
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
