import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserResponseDto {
  @ApiProperty({
    example: '77eec609-2b03-4707-a757-8653ce7c0652',
    description: 'ID of created user',
  })
  id: string;
}
