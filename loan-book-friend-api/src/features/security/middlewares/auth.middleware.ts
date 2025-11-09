import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interfaces';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { SecurityService } from '../services/security.service';

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

        let credId: string | null = null;
        try {
            const tk = this.jwtService.verify<TokenPayload>(token);
            credId = tk.sub;
        } catch {
            throw new UnauthorizedException('invalid_expired_token');
        }

        if (credId) {
            const credential = await this.securityService.details(credId);

            if (!credential) {
                throw new UnauthorizedException('invalid_expired_token');
            }

            req.user = credential.user;
        }

        next();
    }
}
