import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCodeResponse, ApiException } from '@common/api';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppControllerHelloWorld } from './app.swagger';

@ApiTags('Route de base')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation(AppControllerHelloWorld)
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @ApiOperation({
        summary: 'Opération Error()',
        description: 'Cette opération lance une exception personnalisée',
    })
    @Get('error')
    getError(): string {
        throw new ApiException(ApiCodeResponse.TEST, 400);
    }
}
