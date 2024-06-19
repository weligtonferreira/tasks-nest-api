import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
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

  @ApiProperty({
    description: 'Password of user',
    example: 'password',
    minLength: 8,
    maxLength: 50,
    nullable: false,
  })
  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
