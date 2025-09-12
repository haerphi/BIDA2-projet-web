import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@security/enums/user-role.enum';
import { RequestWithUser } from '@security/interfaces/request-with-user.interface';
import { UserEntity } from '@user/models';
import { Observable } from 'rxjs';

@Injectable()
export class RequireRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<UserRole[]>(
            'require-roles',
            context.getHandler(),
        );

        // Récupere la requete (avec la sesson)
        const request: RequestWithUser = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            return false;
        }

        // return roles.includes(user.roles);
        return true; // TODO: User roles
    }
}
