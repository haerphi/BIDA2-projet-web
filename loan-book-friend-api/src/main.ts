import { NestFactory } from '@nestjs/core';
import { AppModule } from './home/app.module';
import { swaggerConfiguration } from '@common/documentation/';
import {
    exceptionFactory,
    HttpExceptionFilter,
} from '@common/config/exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validation de DTO
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory,
        }),
    );

    // Filtres globaux
    app.useGlobalFilters(new HttpExceptionFilter());

    // Prefix
    app.setGlobalPrefix('api');

    // Swagger
    swaggerConfiguration.config(app);

    await app.listen(process.env.PORT ?? 3000);

    console.log(
        `Application is running on: http://localhost:${process.env.PORT ?? 3000}/api`,
    );
    console.log(
        `Swagger is running on: http://localhost:${process.env.PORT ?? 3000}/docs`,
    );
}
bootstrap();
