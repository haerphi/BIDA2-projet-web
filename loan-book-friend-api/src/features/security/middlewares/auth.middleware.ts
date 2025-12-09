import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, RequestWithUser } from '@security/interfaces';
import { SecurityService } from '@security/services';
import { CredentialEntity } from '@security/models';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly securityService: SecurityService,
    ) {}

    async use(req: RequestWithUser, res: Response, next: () => void) {
        const token = req.cookies['access_token'] as string | undefined;

        if (!token) {
            next();
            return;
        }

        console.log('AuthMiddleware: verifying token');
        let credId: string | null = null;
        try {
            const tk = this.jwtService.verify<TokenPayload>(token);
            credId = tk.sub;
        } catch {
            throw new UnauthorizedException('invalid_expired_token');
        }

        if (credId) {
            let credential: CredentialEntity | null = null;
            try {
                credential = await this.securityService.details(credId);
            } catch {
                // nothing to do
            }

            if (!credential) {
                throw new UnauthorizedException('invalid_expired_token');
            }

            req.user = credential.user;
        }

        next();
    }
}
