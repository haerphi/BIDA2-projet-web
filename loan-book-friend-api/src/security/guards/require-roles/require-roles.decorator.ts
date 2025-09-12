import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@security/enums/user-role.enum';

export const RequireRoles = (...args: UserRole[]) =>
    SetMetadata('require-roles', args);
