import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProviders } from './task.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [...taskProviders, TaskService],
})
export class TaskModule {}
