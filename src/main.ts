import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { HandleCustomErrorsExceptionFilter } from './expections-filters/handle-custom-errors.exception-filter';
import { HandleValidationErrorsExceptionFilter } from './expections-filters/handle-validation-errors.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new HandleValidationErrorsExceptionFilter(),
    new HandleCustomErrorsExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('This is a REST API for task management')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
