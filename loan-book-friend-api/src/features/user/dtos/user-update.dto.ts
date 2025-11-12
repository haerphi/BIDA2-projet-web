import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from 'features/security/enums';

export class UserUpdateDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(2, 50)
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;
}

export class UserUpdateAdminDto extends UserUpdateDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
