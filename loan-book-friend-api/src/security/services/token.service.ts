import { configManager } from '@common/config';
import { ConfigKey } from '@common/config/enums';
import {
    TokenExpiredException,
    TokenGenerationException,
} from '@common/exceptions';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenPayload } from '@security/dtos/refresh-token.dto';
import { TokenPayload } from '@security/interfaces';
import { TokenEntity, CredentialEntity } from '@security/models';
import { Builder } from 'builder-pattern';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);

    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
        @InjectRepository(CredentialEntity)
        private readonly credentialRepository: Repository<CredentialEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async getTokens(credential: CredentialEntity): Promise<TokenEntity> {
        try {
            await this.tokenRepository.delete({ credential });
            const payload = {
                sub: credential.credential_id,
            };
            const token = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
                expiresIn: configManager.getValue(
                    ConfigKey.JWT_TOKEN_EXPIRE_IN,
                ),
            });
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(
                    ConfigKey.JWT_REFRESH_TOKEN_SECRET,
                ),
                expiresIn: configManager.getValue(
                    ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN,
                ),
            });

            const tk: TokenEntity = Builder<TokenEntity>()
                .token(token)
                .refreshToken(refreshToken)
                .credential(credential)
                .build();
            await this.tokenRepository.upsert(tk, ['credential']);

            const generatedToken = await this.tokenRepository.findOneBy({
                token: token,
            });
            if (!generatedToken) {
                throw new TokenGenerationException();
            }
            return generatedToken;
        } catch (e) {
            this.logger.error(e);
            throw new TokenGenerationException();
        }
    }

    async delete(credential: CredentialEntity): Promise<void> {
        await this.tokenRepository.delete({ credential });
    }

    async refresh(payload: RefreshTokenPayload): Promise<TokenEntity> {
        let credentialId: string | null = null;

        const JWT_REFRESH_TOKEN_SECRET = configManager.getValue(
            ConfigKey.JWT_REFRESH_TOKEN_SECRET,
            true,
        );

        try {
            credentialId = this.jwtService.verify<TokenPayload>(
                payload.refresh,
                {
                    secret: JWT_REFRESH_TOKEN_SECRET,
                },
            ).sub;
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
