import { ApiProperty } from '@nestjs/swagger';

// used to help listing books when adding a list to user collection
export class BookListDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;
}

// used to list books with their owner information
export class BookUserListDto {
    @ApiProperty()
    book_id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;
}
