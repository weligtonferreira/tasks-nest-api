import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserAlreadyExistsExceptionResponseDto {
  @ApiProperty({
    nullable: true,
    example: 'User already exists',
    description: 'Message of error',
  })
  message: string;

  @ApiProperty({
    nullable: false,
    example: 404,
    description: 'Http status code',
  })
  statusCode: HttpStatus.NOT_FOUND;
}
