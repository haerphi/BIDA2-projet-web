import { ApiProperty } from '@nestjs/swagger';

export class BookDetailsDto {
    @ApiProperty()
    book_id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    available: boolean;
}
