import { PaginationDto } from '@common/dtos/pagination.dto';
import { ToBoolean } from '@common/utils/validator.utils';
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
