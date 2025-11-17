import { ApiProperty } from '@nestjs/swagger';
import { UserListDto } from '@user/dtos';

export class FriendRequestDto {
    @ApiProperty()
    fromYou: boolean;

    @ApiProperty()
    user: UserListDto;
}
