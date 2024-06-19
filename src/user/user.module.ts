import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
