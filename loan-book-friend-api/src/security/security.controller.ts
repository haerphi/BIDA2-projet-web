import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SecurityService } from './services/security.service';
import { SignInPayload } from './dtos/sign-in.dto';
import { SignUpPayload } from './dtos/sign-up.dto';
import { Token } from '@security/models/token.entity';
import { toSignInResponse } from './mappers/signin.mappers';

@ApiBearerAuth('access-token')
@ApiTags('Authentication & Security')
@Controller('auth')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}

    @ApiOperation({
        summary: 'Connect a user',
        description: 'This route allows a user to sign in',
    })
    @Post('signin')
    public async signIn(@Body() payload: SignInPayload) {
        const tk: Token = await this.securityService.signIn(payload);
        return toSignInResponse(tk.token, tk.refreshToken);
    }

    @ApiOperation({
        summary: 'Register a user',
        description: 'This route allows a user to sign up',
    })
    @Post('signup')
    public async signUp(@Body() payload: SignUpPayload) {
        await this.securityService.signUp(payload);
    }
}
