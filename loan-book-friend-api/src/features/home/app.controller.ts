import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppControllerHelloWorld } from './app.swagger';
import { EmailAlreadyExistException } from '@common/exceptions/user.exceptions';

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
        throw new EmailAlreadyExistException();
    }
}
