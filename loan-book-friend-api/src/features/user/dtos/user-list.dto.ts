import { ApiProperty } from '@nestjs/swagger';

export class UserListDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: string;
}
