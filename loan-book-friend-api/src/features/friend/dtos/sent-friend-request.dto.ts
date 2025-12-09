import { UserListDto } from '@user/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class SentFriendRequestDto {
    @ApiProperty()
    receiver: UserListDto;

    @ApiProperty()
    sentAt: Date;
}
