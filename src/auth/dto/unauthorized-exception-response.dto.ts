import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedExceptionResponseDto {
  @ApiProperty({
    description: 'Message of error',
    example: 'Email or password is incorrect',
  })
  message: string;

  @ApiProperty({
    description: 'Error name',
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    description: 'Status code of error',
    example: 401,
  })
  statusCode: number;
}
