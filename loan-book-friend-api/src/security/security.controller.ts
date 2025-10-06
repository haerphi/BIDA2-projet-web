import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SecurityService } from './services/security.service';
import { SignInPayload } from './dtos/sign-in.dto';
import { SignUpPayload } from './dtos/sign-up.dto';
import {
    SignInApiOperationDocumentation,
    SignInApiResponsesDocumentation,
    SignUpDocumentation,
} from './security.swagger';
import { Token } from './interfaces/tokens.interface';
import { configManager } from '@common/config';
import type { Request, Response } from 'express';
import { toSignInResponse } from './mappers/signin.mappers';
import { UnauthorizedException } from '@common/exceptions';
import { CookieKey } from '@common/config/enums';

@ApiBearerAuth('access-token')
@ApiTags('Authentication & Security')
@Controller('auth')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}

    @ApiOperation(SignInApiOperationDocumentation)
    @ApiResponse(SignInApiResponsesDocumentation)
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signIn(
        @Body() payload: SignInPayload,
        @Res({ passthrough: true }) response: Response,
    ) {
        const tk: Token = await this.securityService.signIn(payload);

        // Access token can be short-lived cookie, or returned in body if you prefer
        response.cookie(
            'access_token',
            tk.token,
            configManager.getCookieAccessTokenConfig(),
        );

        response.cookie(
            'refresh_token',
            tk.refreshToken,
            configManager.getCookieRefreshTokenConfig(),
        );

        return toSignInResponse(tk.tokenIat, tk.refreshTokenIat);
    }

    @ApiOperation(SignUpDocumentation)
    @Post('signup')
    public async signUp(@Body() payload: SignUpPayload) {
        await this.securityService.signUp(payload);
    }

    @ApiResponse(SignInApiResponsesDocumentation)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    public async refreshToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refresh = request.cookies['refresh_token'] as string | undefined;

        if (!refresh) {
            throw new UnauthorizedException('refresh_token_missing');
        }

        const tk: Token = await this.securityService.refreshToken(refresh);

        response.cookie(
            CookieKey.ACCESS_TOKEN,
            tk.token,
            configManager.getCookieAccessTokenConfig(),
        );

        response.cookie(
            CookieKey.REFRESH_TOKEN,
            tk.refreshToken,
            configManager.getCookieRefreshTokenConfig(),
        );

        return toSignInResponse(tk.tokenIat, tk.refreshTokenIat);
    }

    @Post('signout')
    @HttpCode(HttpStatus.NO_CONTENT)
    public signOut(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        response.clearCookie(
            CookieKey.ACCESS_TOKEN,
            configManager.getCookieAccessTokenConfig(),
        );
        response.clearCookie(
            CookieKey.REFRESH_TOKEN,
            configManager.getCookieRefreshTokenConfig(),
        );

        return;
    }
}
