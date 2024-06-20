import { HttpStatus } from '@nestjs/common';

import { CustomErrorException } from './CustomErrorException';

export class AlreadyExistsException extends CustomErrorException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
