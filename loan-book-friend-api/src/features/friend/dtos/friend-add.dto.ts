import { ApiPropertyOptional } from '@nestjs/swagger';

export class FriendAddDto {
    @ApiPropertyOptional()
    friend_name?: string;

    @ApiPropertyOptional()
    friend_email?: string;
}
