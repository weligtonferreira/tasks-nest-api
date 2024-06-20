import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindUserByEmailDto {
  @ApiProperty({
    description: 'E-mail of user',
    example: 'username@email.com',
    minLength: 10,
    maxLength: 100,
    nullable: false,
  })
  @MaxLength(100)
  @MinLength(10)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
