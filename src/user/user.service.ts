import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundErrorException } from '../errors/NotFoundErrorException';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.save(createUserDto);

    return { id: newUser.id };
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new NotFoundErrorException('Users not found');
    }

    return users;
  }

  async findById(id: string) {
    const user = await this.userRepository.find({ where: { id } });

    if (user.length === 0) {
      throw new NotFoundErrorException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.find({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.findById(id);

    this.userRepository.delete(id);
  }
}
