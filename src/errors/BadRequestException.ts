import { HttpStatus } from '@nestjs/common';

import { CustomErrorException } from './CustomErrorException';

export class BadRequestException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
