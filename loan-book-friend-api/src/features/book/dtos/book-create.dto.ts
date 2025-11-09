import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class BookCreateDto {
    @ApiProperty()
    @IsString()
    @Length(2, 255)
    title: string;

    @ApiProperty()
    @IsString()
    @Length(2, 255)
    author: string;
}
