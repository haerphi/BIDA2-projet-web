import { ApiProperty } from '@nestjs/swagger';

export class FriendRemoveDto {
    @ApiProperty()
    friend_user_id: string;
}
