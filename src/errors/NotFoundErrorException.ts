import { HttpStatus } from '@nestjs/common';

export class NotFoundErrorException extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
