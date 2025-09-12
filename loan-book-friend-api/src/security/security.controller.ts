import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SecurityService } from './services/security.service';
import { SignInPayload } from './dtos/sign-in.dto';
import { SignUpPayload } from './dtos/sign-up.dto';
import { TokenEntity } from '@security/models/token.entity';
import { toSignInResponse } from './mappers/signin.mappers';
import { SignInDocumentation, SignUpDocumentation } from './security.swagger';

@ApiBearerAuth('access-token')
@ApiTags('Authentication & Security')
@Controller('auth')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}

    @ApiOperation(SignInDocumentation)
    @Post('signin')
    public async signIn(@Body() payload: SignInPayload) {
        const tk: TokenEntity = await this.securityService.signIn(payload);
        return toSignInResponse(tk.token, tk.refreshToken);
    }

    @ApiOperation(SignUpDocumentation)
    @Post('signup')
    public async signUp(@Body() payload: SignUpPayload) {
        await this.securityService.signUp(payload);
    }
}
