import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
    @ApiPropertyOptional({
        default: 1,
    })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    page?: number = 1;

    @ApiPropertyOptional({
        default: 10,
    })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    limit?: number = 10;

    @ApiPropertyOptional()
    orderBy?: string;

    @ApiPropertyOptional()
    orderDirection?: 'ASC' | 'DESC';
}
