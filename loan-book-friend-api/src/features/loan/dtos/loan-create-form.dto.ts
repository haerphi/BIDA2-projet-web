import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoanCreateForm {
    @ApiProperty()
    @IsString()
    bookId: string;

    @ApiProperty()
    @IsString()
    borrowerId: string;

    @ApiProperty()
    returnDate: Date;
}
