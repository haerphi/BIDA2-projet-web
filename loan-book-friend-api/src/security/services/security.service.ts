import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential, Token } from '@security/models';
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

@Injectable()
export class SecurityService {
    constructor(
        @InjectRepository(Credential)
        private readonly credentialRepository: Repository<Credential>,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    async details(id: string): Promise<Credential> {
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

        console.log('cred', cred);

        if (
            !cred ||
            !(await comparePassword(payload.password, cred.password))
        ) {
            console.log('wrong credential');
            throw new WrongCredentialException();
        }

        return this.tokenService.getTokens(cred);
    }

    async signUp(payload: SignUpPayload): Promise<Credential | null> {
        const user = await this.userService.create(
            signupPayloadToUser(payload),
        );

        const hashedPassword = await encryptPassword(payload.password);

        const credential = this.credentialRepository.save(
            Builder<Credential>().user(user).password(hashedPassword).build(),
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
        await this.tokenService.delete(details);
        await this.credentialRepository.remove(details);
    }
}
