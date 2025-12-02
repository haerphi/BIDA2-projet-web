import { BookAvailability } from '@book/enums';
import { ApiProperty } from '@nestjs/swagger';

export class BookDetailsDto {
    @ApiProperty()
    book_id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    loanedTo: Date | null;

    @ApiProperty()
    available: BookAvailability;
}
