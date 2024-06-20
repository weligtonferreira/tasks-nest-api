import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { IUserService } from './interfaces/IUserService';
import { ICreatedUserResponse } from './interfaces/ICreatedUserResponse';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundException } from '../errors/NotFoundException';
import { AlreadyExistsException } from 'src/errors/AlreadyExistsException';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ICreatedUserResponse> {
    const userExists = await this.userRepository.find({
      where: { email: createUserDto.email },
    });

    if (userExists[0] !== undefined) {
      throw new AlreadyExistsException('User already exists');
    }

    const newUser = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 8),
    });

    await this.userRepository.save(newUser);

    return { id: newUser.id };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.findById(id);

    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);

    await this.userRepository.update(id, updateUserDto);
  }

  async removeById(id: string): Promise<void> {
    await this.findById(id);

    await this.userRepository.delete(id);
  }
}
