import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { IUserService } from './interfaces/IUserService';
import { ICreatedUserResponse } from './interfaces/ICreatedUserResponse';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundErrorException } from '../errors/NotFoundErrorException';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ICreatedUserResponse> {
    const newUser = await this.userRepository.save(createUserDto);

    return { id: newUser.id };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new NotFoundErrorException('Users not found');
    }

    return users;
  }

  async findById(id: string): Promise<User[]> {
    const user = await this.userRepository.find({ where: { id } });

    if (user.length === 0) {
      throw new NotFoundErrorException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({ where: { email } });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.findById(id);

    this.userRepository.update(id, updateUserDto);
  }

  async removeById(id: string): Promise<void> {
    await this.findById(id);

    this.userRepository.delete(id);
  }
}
