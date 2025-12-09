import { BookAvailability } from '@book/enums';
import { ApiProperty } from '@nestjs/swagger';

export class BookListOwnedDto {
    @ApiProperty()
    bookId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    condition: 'new' | 'good' | 'poor';

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    availability: BookAvailability;
}
