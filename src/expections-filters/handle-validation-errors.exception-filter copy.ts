import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class HandleValidationErrorsExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(exception.status).json({
      statusCode: exception.status,
      message: exception.response.message,
      error: exception.response.error,
    });
  }
}
