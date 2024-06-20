import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatedUserResponseDto } from './dto/created-user-response.dto';
import { NotFoundReponseDto } from '../dto/not-found-response.dto';

import { ICreatedUserResponse } from './interfaces/ICreatedUserResponse';
import { IUserController } from './interfaces/IUserController';

@ApiTags('users')
@Controller('users')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiParam({
    name: 'username',
    description: 'Username of the user',
    example: 'username',
    required: true,
    type: 'string',
  })
  @ApiParam({
    name: 'email',
    description: 'E-mail of the user',
    example: 'username@email.com',
    required: true,
    type: 'string',
  })
  @ApiParam({
    name: 'password',
    description: 'Password of the user',
    example: 'password',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new user',
    type: [CreatedUserResponseDto],
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ICreatedUserResponse> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a list of users',
    type: [User],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users not found',
    type: [NotFoundReponseDto],
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List an user by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'List the user with the given ID if it exists',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: [NotFoundReponseDto],
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'List an user by email' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'List the user with the given email if it exists',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: [NotFoundReponseDto],
  })
  async findByEmail(@Query('email') email: string): Promise<User[]> {
    return await this.userService.findByEmail(email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update an user by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Update the user with the given ID if it exists',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: [NotFoundReponseDto],
  })
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.userService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an user by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete the user with the given ID if it exists',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: [NotFoundReponseDto],
  })
  async removeById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.userService.removeById(id);
  }
}
