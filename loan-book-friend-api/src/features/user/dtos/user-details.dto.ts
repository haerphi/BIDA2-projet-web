import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@security/enums';
import { BookListOwnedDto } from '@book/dtos';

export class UserDetailsDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: UserRole;

    @ApiProperty()
    createdAt: Date;
}
