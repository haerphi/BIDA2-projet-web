import { Controller, Get } from '@nestjs/common';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';

@Controller('user')
export class UserController {
    @RequireRoles()
    @Get()
    public getConsumer(@User() user: UserEntity) {
        return user;
    }
}
