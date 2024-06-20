import { HttpStatus } from '@nestjs/common';

import { CustomErrorException } from './CustomErrorException';

export class AlreadyExistsErrorException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
