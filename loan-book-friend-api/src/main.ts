import { NestFactory } from '@nestjs/core';
import { AppModule } from './home/app.module';
import { swaggerConfiguration } from '@common/documentation/';
import { HttpExceptionFilter } from '@common/config/exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validation de DTO
    app.useGlobalPipes(new ValidationPipe());

    // Filtres globaux
    app.useGlobalFilters(new HttpExceptionFilter());

    // Swagger
    swaggerConfiguration.config(app);

    await app.listen(process.env.PORT ?? 3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
