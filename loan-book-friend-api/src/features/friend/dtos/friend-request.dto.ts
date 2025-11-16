import { ToBoolean } from '@common/utils/validator.utils';
import { ApiProperty } from '@nestjs/swagger';
import { UserListDto } from 'features/user/dtos';

export class FriendRequestDto {
    @ApiProperty()
    @ToBoolean()
    fromYou: boolean;

    @ApiProperty({ type: () => UserListDto })
    user: UserListDto;
}
