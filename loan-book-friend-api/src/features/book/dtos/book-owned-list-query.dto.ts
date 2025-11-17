import { PaginationQueryDto } from '@common/dtos';
import { ToBoolean } from '@common/utils/validators';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BookOwnedListQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional()
    title?: string;

    @ApiPropertyOptional()
    author?: string;

    @ApiPropertyOptional()
    @ToBoolean()
    currentlyLoaned?: boolean;
}
