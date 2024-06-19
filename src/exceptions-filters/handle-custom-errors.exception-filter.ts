import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomErrorException } from 'src/errors/CustomErrorException';

@Catch(CustomErrorException)
export class HandleCustomErrorsExceptionFilter extends BaseExceptionFilter {
  catch(exception: CustomErrorException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(exception.statusCode).json({
      statusCode: exception?.statusCode,
      message: exception?.message,
    });
  }
}
