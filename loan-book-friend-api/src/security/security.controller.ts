import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SecurityService } from './services/security.service';
import { SignInPayload } from './dtos/sign-in.dto';
import { SignUpPayload } from './dtos/sign-up.dto';
import { toSignInResponse } from './mappers/signin.mappers';
import {
    SignInApiOperationDocumentation,
    SignInApiResponsesDocumentation,
    SignUpDocumentation,
} from './security.swagger';
import { Token } from './interfaces/tokens.interface';
import { RefreshTokenPayload } from './dtos/refresh-token.dto';

@ApiBearerAuth('access-token')
@ApiTags('Authentication & Security')
@Controller('auth')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}

    @ApiOperation(SignInApiOperationDocumentation)
    @ApiResponse(SignInApiResponsesDocumentation)
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() payload: SignInPayload) {
        const tk: Token = await this.securityService.signIn(payload);
        return toSignInResponse(tk.token, tk.refreshToken);
    }

    @ApiOperation(SignUpDocumentation)
    @Post('signup')
    public async signUp(@Body() payload: SignUpPayload) {
        await this.securityService.signUp(payload);
    }

    @ApiResponse(SignInApiResponsesDocumentation)
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() payload: RefreshTokenPayload) {
        const tk: Token = await this.securityService.refreshToken(
            payload.refresh,
        );
        return toSignInResponse(tk.token, tk.refreshToken);
    }
}
