import { BookListDto } from '@book/dtos';
import { UserListDto } from '@user/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class LoanGetListDto {
    @ApiProperty()
    loanId: string;

    @ApiProperty()
    bookId: string;

    @ApiProperty()
    borrower: UserListDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    shouldBeReturnedAt: Date | null;

    @ApiProperty()
    returnedAt: Date | null;
}

export class LoanGetListWithBookDto extends LoanGetListDto {
    @ApiProperty()
    book: BookListDto;
}
