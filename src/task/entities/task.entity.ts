import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { TaskStatusEnum } from '../enums/task-status-enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID of task',
    example: '77eec609-2b03-4707-a757-8653ce7c0652',
    type: 'UUID',
    nullable: true,
  })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    description: 'Title of task',
    example: 'Make a cake',
    nullable: false,
    minLength: 1,
    maxLength: 255,
  })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example: 'Make a delicious chocolate cake',
    description: 'Description of task',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.Pending,
    nullable: true,
  })
  @ApiProperty({
    description: 'Status of task',
    enumName: 'TaskStatusEnum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.Pending,
    nullable: true,
  })
  status: TaskStatusEnum;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date the task was created',
    example: '2024-06-18T14:38:29.688Z',
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Date the task was updated',
    example: '2024-06-18T14:38:29.688Z',
    nullable: true,
  })
  updatedAt: Date;
}
