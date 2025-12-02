import { ApiProperty } from '@nestjs/swagger';

export class UserListDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}

export class UserListWithRoleDto extends UserListDto {
    @ApiProperty()
    role: string;
}
