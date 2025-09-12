import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequireRoles, RequireRolesGuard } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';

@Controller('user')
export class UserController {
    @RequireRoles()
    @UseGuards(RequireRolesGuard)
    @ApiBearerAuth()
    @Get()
    public getConsumer(@User() user: UserEntity) {
        return user;
    }
}
