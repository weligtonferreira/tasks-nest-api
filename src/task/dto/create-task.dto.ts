import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of task',
    example: 'Make a cake',
    nullable: false,
    minLength: 1,
    maxLength: 255,
  })
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of task',
    example: 'Make a delicious chocolate cake',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  descrition?: string;
}
