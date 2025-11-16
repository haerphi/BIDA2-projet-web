import { PaginationDto } from '@common/dtos';
import { ToBoolean } from '@common/utils/validators';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FriendRequestGetQueryDto extends PaginationDto {
    @ApiPropertyOptional()
    @ToBoolean()
    fromYou?: boolean;

    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    email?: string;
}
