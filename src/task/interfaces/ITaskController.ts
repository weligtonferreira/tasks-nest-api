import { Task } from '../entities/task.entity';

import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

import { ICreatedTaskResponse } from './ICreatedTaskResponse';

import { TaskStatusEnum } from '../enums/task-status-enum';

export interface ITaskController {
  create: (createTaskDto: CreateTaskDto) => Promise<ICreatedTaskResponse>;
  findAll: (status: TaskStatusEnum) => Promise<Task[]>;
  findById: (id: string) => Promise<Task[]>;
  updateById: (id: string, updateTaskDto: UpdateTaskDto) => Promise<void>;
  removeById: (id: string) => Promise<void>;
}
