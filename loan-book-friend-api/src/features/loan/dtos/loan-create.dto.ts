import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoanCreateDto {
    @ApiProperty()
    @IsString()
    bookId: string;

    @ApiProperty()
    @IsString()
    borrowerId: string;
}
