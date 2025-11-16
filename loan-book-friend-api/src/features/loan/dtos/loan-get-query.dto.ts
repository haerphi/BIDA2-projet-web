import { PaginationDto } from '@common/dtos';
import { ToBoolean } from '@common/utils/validators';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoanGetQueryDto extends PaginationDto {
    @ApiPropertyOptional()
    @ToBoolean()
    asBorrower?: boolean;

    @ApiPropertyOptional()
    @ToBoolean()
    asLender?: boolean;
}
