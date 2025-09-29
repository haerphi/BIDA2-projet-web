import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialEntity } from '@security/models';
import { TokenService } from './token.service';
import { SignInPayload } from '@security/dtos/sign-in.dto';
import {
    comparePassword,
    encryptPassword,
} from '@security/utils/password-decoder.utils';
import { SignUpPayload } from '@security/dtos/sign-up.dto';
import { UserService } from '@user/services/user.service';
import { signupPayloadToUser } from '@security/mappers/signup.mappers';
import { Builder } from 'builder-pattern';
import {
    CredentialNotFoundException,
    WrongCredentialException,
} from '@common/exceptions';
import { Token } from '@security/interfaces/tokens.interface';

@Injectable()
export class SecurityService {
    constructor(
        @InjectRepository(CredentialEntity)
        private readonly credentialRepository: Repository<CredentialEntity>,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    async details(id: string): Promise<CredentialEntity> {
        const result = await this.credentialRepository.findOneBy({
            credential_id: id,
        });
        if (!result) {
            throw new CredentialNotFoundException();
        }

        return result;
    }

    async signIn(payload: SignInPayload): Promise<Token> {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            throw new WrongCredentialException();
        }

        const cred = await this.credentialRepository.findOne({
            where: { user: { user_id: user.user_id } },
        });

        if (
            !cred ||
            !(await comparePassword(payload.password, cred.password))
        ) {
            throw new WrongCredentialException();
        }

        return this.tokenService.getTokens(cred);
    }

    async signUp(payload: SignUpPayload): Promise<CredentialEntity | null> {
        const user = await this.userService.create(
            signupPayloadToUser(payload),
        );

        const hashedPassword = await encryptPassword(payload.password);

        const credential = this.credentialRepository.save(
            Builder<CredentialEntity>()
                .user(user)
                .password(hashedPassword)
                .build(),
        );

        return credential;
    }

    async delete(id: string): Promise<void> {
        const credential = await this.credentialRepository.findOneBy({
            credential_id: id,
        });
        if (!credential) {
            throw new CredentialNotFoundException();
        }

        const details = await this.details(id);
        await this.credentialRepository.remove(details);
    }
}
