import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TaskNotFoundExceptionResponseDto {
  @ApiProperty({
    nullable: true,
    example: 'Task not found',
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
