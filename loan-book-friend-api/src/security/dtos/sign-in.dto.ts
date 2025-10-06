import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInPayload {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    password: string;
}

export class SignInResponse {
    @ApiProperty()
    tokenIat: number;

    @ApiProperty()
    refreshTokenIat: number;
}
