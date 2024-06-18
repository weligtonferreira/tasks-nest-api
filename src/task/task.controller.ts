import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Task } from './entities/task.entity';

import { ITaskController } from './interfaces/ITaskController';
import { ICreatedTaskResponse } from './interfaces/ICreatedTaskResponse';

@Controller('tasks')
export class TaskController implements ITaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ICreatedTaskResponse> {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task[]> {
    return this.taskService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    return await this.taskService.updateById(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.taskService.removeById(id);
  }
}
