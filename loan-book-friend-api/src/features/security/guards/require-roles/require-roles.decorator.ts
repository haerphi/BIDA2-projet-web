import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../../enums/user-role.enum';
import { RequireRolesGuard } from './require-roles.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const RequireRoles = (...args: UserRole[]) =>
    applyDecorators(
        SetMetadata('require-roles', args),
        UseGuards(RequireRolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
