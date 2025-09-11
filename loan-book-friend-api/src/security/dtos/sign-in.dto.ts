import { ApiProperty } from '@nestjs/swagger';

export class SignInPayload {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class SignInResponse {
    @ApiProperty()
    token: string;

    @ApiProperty()
    refreshToken: string;
}
