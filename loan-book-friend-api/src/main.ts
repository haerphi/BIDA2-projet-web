import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@common/config';
import { swaggerConfiguration } from '@common/documentation/swagger.configuration';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Filtres globaux
    app.useGlobalFilters(new HttpExceptionFilter());

    // Swagger
    swaggerConfiguration.config(app);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
