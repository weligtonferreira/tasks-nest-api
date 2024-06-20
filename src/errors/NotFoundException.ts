import { HttpStatus } from '@nestjs/common';

import { CustomErrorException } from './CustomErrorException';

export class NotFoundException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
