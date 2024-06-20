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
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreatedTaskResponseDto } from './dto/created-task-response.dto';
import { TaskNotFoundExceptionResponseDto } from './dto/task-not-found-exception-response.dto';
import { TaskAlreadyExistsExceptionResponseDto } from './dto/task-already-exists-exception.dto';

import { ITaskController } from './interfaces/ITaskController';
import { ICreatedTaskResponse } from './interfaces/ICreatedTaskResponse';

import { TaskStatusEnum } from './enums/task-status-enum';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController implements ITaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiParam({
    name: 'title',
    description: 'Title of the task',
    example: 'Go running',
    required: true,
    type: 'string',
  })
  @ApiParam({
    name: 'description',
    description: 'Description of the task',
    example: 'Go running at 6 a.m in Central Park',
    required: false,
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new task',
    type: [CreatedTaskResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
    type: [TaskAlreadyExistsExceptionResponseDto],
  })
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ICreatedTaskResponse> {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a list of tasks',
    type: [Task],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tasks not found',
    type: [TaskNotFoundExceptionResponseDto],
  })
  async findAll(@Query('status') status: TaskStatusEnum): Promise<Task[]> {
    if (status === TaskStatusEnum.Done || status === TaskStatusEnum.Pending) {
      return await this.taskService.findAllByStatus(status);
    }

    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of task',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List the task with the given ID if it exists',
    type: [Task],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
    type: [TaskNotFoundExceptionResponseDto],
  })
  findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task[]> {
    return this.taskService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of task',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Update the task with the given ID if it exists',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
    type: [TaskNotFoundExceptionResponseDto],
  })
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    return await this.taskService.updateById(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of task',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete the task with the given ID if it exists',
    type: [TaskNotFoundExceptionResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  async removeById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.taskService.removeById(id);
  }
}
