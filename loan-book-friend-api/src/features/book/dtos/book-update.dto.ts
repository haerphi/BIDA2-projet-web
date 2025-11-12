import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';

export class BookUpdateDto {
    @ApiProperty()
    @IsString()
    @Length(2, 255)
    title?: string;

    @ApiProperty()
    @IsString()
    @Length(2, 255)
    author?: string;

    @ApiProperty()
    @IsBoolean()
    available?: boolean;
}
