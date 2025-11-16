import { ToBoolean } from '@common/utils/validators';
import { ApiProperty } from '@nestjs/swagger';
import { UserListDto } from '@user/dtos';

export class FriendRequestDto {
    @ApiProperty()
    @ToBoolean()
    fromYou: boolean;

    @ApiProperty({ type: () => UserListDto })
    user: UserListDto;
}
