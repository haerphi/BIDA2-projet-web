import { PaginationQueryDto } from '@common/dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BookListQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional()
    title?: string;

    @ApiPropertyOptional()
    author?: string;
}
