import { User } from '../entities/user.entity';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { ICreatedUserResponse } from './ICreatedUserResponse';

export interface IUserService {
  create: (createTaskDto: CreateUserDto) => Promise<ICreatedUserResponse>;
  findAll: () => Promise<User[]>;
  findById: (id: string) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findByEmailForAuthentication: (email: string) => Promise<User>;
  updateById: (id: string, updateUserDto: UpdateUserDto) => Promise<void>;
  removeById: (id: string) => Promise<void>;
}
