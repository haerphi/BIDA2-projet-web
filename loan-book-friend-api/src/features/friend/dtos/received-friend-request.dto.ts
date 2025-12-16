import { ApiProperty } from '@nestjs/swagger';
import { UserListDto } from '@user/dtos';

export class ReceivedFriendRequestDto {
    @ApiProperty()
    sender: UserListDto;

    @ApiProperty()
    sentAt: Date;
}
