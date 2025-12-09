import { BookAvailability, BookCondition } from '@book/enums';
import { PaginationQueryDto } from '@common/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class BookGetListQueryDto extends PaginationQueryDto {
    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    author?: string;

    @ApiProperty({ required: false })
    condition?: BookCondition;

    @ApiProperty({ required: false })
    availability?: BookAvailability;
}
