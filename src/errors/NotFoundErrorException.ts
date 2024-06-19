import { HttpStatus } from '@nestjs/common';

import { CustomErrorException } from './CustomErrorException';

export class NotFoundErrorException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
