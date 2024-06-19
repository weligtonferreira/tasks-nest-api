import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(25)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MaxLength(100)
  @MinLength(10)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
