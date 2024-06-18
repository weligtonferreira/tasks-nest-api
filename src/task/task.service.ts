import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Task } from './entities/task.entity';

import { ITaskService } from './interfaces/ITaskService';
import { ICreatedTaskResponse } from './interfaces/ICreatedTaskResponse';

import { NotFoundError } from 'src/errors/NotFoundError';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ICreatedTaskResponse> {
    const newTask = await this.taskRepository.save(createTaskDto);

    return { id: newTask.id };
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();

    if (tasks.length === 0) {
      throw new NotFoundError('Tasks not found');
    }

    return tasks;
  }

  async findById(id: string): Promise<Task[]> {
    const task = await this.taskRepository.find({ where: { id } });

    if (task.length === 0) {
      throw new NotFoundError('Task not found');
    }

    return task;
  }

  async updateById(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    await this.findById(id);

    this.taskRepository.update(id, updateTaskDto);
  }

  async removeById(id: string): Promise<void> {
    await this.findById(id);

    this.taskRepository.delete(id);
  }
}
