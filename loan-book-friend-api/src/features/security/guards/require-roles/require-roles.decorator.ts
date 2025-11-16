import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRole } from '@security/enums';
import { RequireRolesGuard } from './require-roles.guard';

export const RequireRoles = (...args: UserRole[]) =>
    applyDecorators(
        SetMetadata('require-roles', args),
        UseGuards(RequireRolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
