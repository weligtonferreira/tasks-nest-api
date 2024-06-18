import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { HandleAllErrorsExceptionFilter } from './expections-filters/handle-all-errors.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HandleAllErrorsExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: 422, transform: true }),
  );

  await app.listen(3000);
}
bootstrap();
