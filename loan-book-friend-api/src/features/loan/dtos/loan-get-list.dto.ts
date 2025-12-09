import { BookListDto } from '@book/dtos';
import { UserListDto } from '@user/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class LoanGetListDto {
    @ApiProperty()
    loanId: string;

    @ApiProperty()
    book: BookListDto;

    @ApiProperty()
    borrower: UserListDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    shouldBeReturnedAt: Date | null;

    @ApiProperty()
    returnedAt: Date | null;
}
