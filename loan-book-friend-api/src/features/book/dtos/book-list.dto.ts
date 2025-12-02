import { BookAvailability } from '@book/enums/book-availability.enum';
import { ApiProperty } from '@nestjs/swagger';

// used to help listing books when adding a list to user collection
export class BookListDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;
}

// used to list books with their owner information
export class BookUserListDto extends BookListDto {
    @ApiProperty()
    book_id: string;

    @ApiProperty()
    available: BookAvailability;
}
