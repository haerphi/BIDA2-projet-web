import { BookListDto } from '@book/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { UserListDto } from '@user/dtos';

export class LoanListDto {
    @ApiProperty()
    loanId: string;

    @ApiProperty()
    book: BookListDto;

    @ApiProperty()
    lender: UserListDto;

    @ApiProperty()
    borrower: UserListDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    returnedDate: Date | null;

    @ApiProperty()
    role: 'LENDER' | 'BORROWER';
}
