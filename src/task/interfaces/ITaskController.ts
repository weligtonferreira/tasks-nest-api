import { Task } from '../entities/task.entity';

import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

import { ICreatedTaskResponse } from './ICreatedTaskResponse';

export interface ITaskController {
  create: (createTaskDto: CreateTaskDto) => Promise<ICreatedTaskResponse>;
  findAll: () => Promise<Task[]>;
  findById: (id: string) => Promise<Task[]>;
  updateById: (id: string, updateTaskDto: UpdateTaskDto) => Promise<void>;
  removeById: (id: string) => Promise<void>;
}
