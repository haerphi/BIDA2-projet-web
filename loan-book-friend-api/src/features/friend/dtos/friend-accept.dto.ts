import { ApiProperty } from '@nestjs/swagger';

export class FriendAcceptDto {
    @ApiProperty()
    new_friend_user_id: string;
}
