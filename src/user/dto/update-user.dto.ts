import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The username of user',
    example: 'username',
    minLength: 1,
    maxLength: 25,
    nullable: true,
  })
  @MaxLength(25)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiProperty({
    description: 'E-mail of user',
    example: 'username@email.com',
    minLength: 10,
    maxLength: 100,
    nullable: true,
  })
  @MaxLength(100)
  @MinLength(10)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'password',
    minLength: 8,
    maxLength: 50,
    nullable: true,
  })
  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password?: string;
}
