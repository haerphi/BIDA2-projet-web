import { PaginationQueryDto } from '@common/dtos';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LoanStatusEnum } from '@loan/enums';

export class BorrowGetListQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional()
    bookId?: string;

    @ApiPropertyOptional()
    loanerId?: string;

    orderBy: string | undefined = 'shouldBeReturnedAt';

    orderDirection: 'DESC' | 'ASC' | undefined = 'DESC';

    @ApiPropertyOptional()
    status?: LoanStatusEnum;
}
