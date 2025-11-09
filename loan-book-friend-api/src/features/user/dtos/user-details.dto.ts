import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../security/enums';

export class UserDetailsDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: UserRole;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
