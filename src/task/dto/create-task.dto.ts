import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TaskStatusEnum } from '../enums/task-status-enum';

export class CreateTaskDto {
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  descrition: string | null;

  @IsString()
  @IsOptional()
  status: TaskStatusEnum | null;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
