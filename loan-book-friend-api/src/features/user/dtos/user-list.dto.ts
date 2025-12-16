import { ApiProperty } from '@nestjs/swagger';

export class UserListDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}

export class UserListWithRoleDto extends UserListDto {
    @ApiProperty()
    role: string;
}
