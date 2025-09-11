import { NestFactory } from '@nestjs/core';
import { AppModule } from './home/app.module';
import { swaggerConfiguration } from '@common/documentation/';
import { HttpExceptionFilter } from '@common/config/exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Filtres globaux
    app.useGlobalFilters(new HttpExceptionFilter());

    // Swagger
    swaggerConfiguration.config(app);

    await app.listen(process.env.PORT ?? 3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
