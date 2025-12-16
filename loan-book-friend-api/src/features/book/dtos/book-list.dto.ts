import { ApiProperty } from '@nestjs/swagger';

export class BookListDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;
}
