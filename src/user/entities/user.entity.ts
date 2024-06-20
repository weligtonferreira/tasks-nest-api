import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID of user',
    example: '77eec609-2b03-4707-a757-8653ce7c0652',
    type: 'UUID',
    nullable: true,
  })
  id: string;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  @ApiProperty({
    description: 'The username of user',
    example: 'username',
    minLength: 1,
    maxLength: 25,
    nullable: false,
  })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @ApiProperty({
    description: 'E-mail of user',
    example: 'username@email.com',
    minLength: 10,
    maxLength: 100,
    nullable: false,
  })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({
    description: 'Password of user',
    example: 'encrytedpassword',
    minLength: 8,
    maxLength: 100,
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date the task was updated',
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
