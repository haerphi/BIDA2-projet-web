import { ApiProperty } from '@nestjs/swagger';

export class SignUpPayload {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
