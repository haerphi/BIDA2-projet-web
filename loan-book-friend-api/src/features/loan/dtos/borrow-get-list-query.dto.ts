import { PaginationQueryDto } from '@common/dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BorrowGetListQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional()
    bookId?: string;

    @ApiPropertyOptional()
    loanerId?: string;
}
