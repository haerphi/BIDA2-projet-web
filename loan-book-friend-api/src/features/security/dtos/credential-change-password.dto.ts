import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CredentialChangePasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public oldPassword: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public newPassword: string;
}

export class CredentialChangePasswordAdminDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    public newPassword: string;
}
