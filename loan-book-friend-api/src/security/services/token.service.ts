import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enums';
import {
    TokenExpiredException,
    TokenGenerationException,
} from '@common/exceptions';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayload } from '@security/interfaces';
import { Token } from '@security/interfaces/tokens.interface';
import { CredentialEntity } from '@security/models';
import { durationParser } from '@security/utils/duration-parser.utils';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);

    constructor(
        @InjectRepository(CredentialEntity)
        private readonly credentialRepository: Repository<CredentialEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async getTokens(credential: CredentialEntity): Promise<Token> {
        try {
            const payload = {
                sub: credential.credential_id,
            };
            const tokenExpireIn = configManager.getValue(
                ConfigKey.JWT_TOKEN_EXPIRE_IN,
            );
            const token = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
                expiresIn: tokenExpireIn,
            });

            const refreshTokenExpireIn = configManager.getValue(
                ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN,
            );
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(
                    ConfigKey.JWT_REFRESH_TOKEN_SECRET,
                ),
                expiresIn: refreshTokenExpireIn,
            });

            const tokenDuration = durationParser(tokenExpireIn);
            const refreshTokenDuration = durationParser(refreshTokenExpireIn);

            return {
                token,
                tokenIat: Date.now() + tokenDuration * 1000,
                refreshToken,
                refreshTokenIat: Date.now() + refreshTokenDuration * 1000,
            };
        } catch (e) {
            this.logger.error(e);
            throw new TokenGenerationException();
        }
    }

    async refresh(refresh: string): Promise<Token> {
        let credentialId: string | null = null;

        const JWT_REFRESH_TOKEN_SECRET = configManager.getValue(
            ConfigKey.JWT_REFRESH_TOKEN_SECRET,
            true,
        );

        try {
            credentialId = this.jwtService.verify<TokenPayload>(refresh, {
                secret: JWT_REFRESH_TOKEN_SECRET,
            }).sub;
        } catch {
            throw new TokenExpiredException();
        }

        const credential = await this.credentialRepository.findOneBy({
            credential_id: credentialId,
        });

        if (!credential) {
            throw new TokenExpiredException();
        }

        const generatedToken = await this.getTokens(credential);
        if (!generatedToken) {
            throw new TokenGenerationException();
        }
        return generatedToken;
    }
}
