import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestExceptionResponseDto {
  @ApiProperty({
    nullable: true,
    example: 'Incorrect status',
    description: 'Message of error',
  })
  message: string;

  @ApiProperty({
    nullable: false,
    example: 404,
    description: 'Http status code',
  })
  statusCode: HttpStatus.BAD_REQUEST;
}
