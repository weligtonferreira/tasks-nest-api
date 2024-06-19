import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

import { TaskStatusEnum } from '../enums/task-status-enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Make a cake',
    nullable: true,
    minLength: 1,
    maxLength: 255,
  })
  title?: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Make a delicious chocolate cake',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Status of the task',
    example: 'DONE',
    nullable: true,
    enumName: 'TaskStatusEnum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.Pending,
  })
  status?: TaskStatusEnum;
}
