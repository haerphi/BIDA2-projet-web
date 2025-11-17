import { PaginationQueryDto } from '@common/dtos';
import { ToBoolean } from '@common/utils/validators';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoanGetQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional()
    @ToBoolean()
    asBorrower?: boolean;

    @ApiPropertyOptional()
    @ToBoolean()
    asLender?: boolean;

    @ApiPropertyOptional()
    @ToBoolean()
    returned?: boolean;
}
