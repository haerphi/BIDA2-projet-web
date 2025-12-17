import { ApiProperty } from '@nestjs/swagger';
import { BookAvailability, BookCondition } from '@book/enums';
import { UserListDto } from '@user/dtos';
import { LoanGetListDto, LoanGetListWithBookDto } from '@loan/dtos';

export class BookDetailsDto {
    @ApiProperty()
    bookId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    condition: BookCondition;

    @ApiProperty()
    availability: BookAvailability;

    @ApiProperty()
    owner: UserListDto;

    @ApiProperty()
    loans: LoanGetListDto[];
}
