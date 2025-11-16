import { PaginationDto } from '@common/dtos/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FriendGetQueryDto extends PaginationDto {
    @ApiPropertyOptional()
    name?: string;

    @ApiPropertyOptional()
    email?: string;
}
