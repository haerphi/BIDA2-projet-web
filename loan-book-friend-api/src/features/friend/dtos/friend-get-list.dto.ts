import { ApiProperty } from '@nestjs/swagger';
import { UserListDto } from '@user/dtos';

export class FriendGetListDto {
    @ApiProperty()
    user: UserListDto;

    @ApiProperty()
    loanCount: number;

    @ApiProperty()
    overdueCount: number;
}
