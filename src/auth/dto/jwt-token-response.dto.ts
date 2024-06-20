import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenReponseDto {
  @ApiProperty({
    description: 'JWT Token',
  })
  access_token: string;
}
