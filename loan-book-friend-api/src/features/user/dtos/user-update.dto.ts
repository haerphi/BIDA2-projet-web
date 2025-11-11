import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from 'features/security/enums';

export class UserUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(2, 50)
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
