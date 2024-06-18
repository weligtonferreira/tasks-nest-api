import { TaskStatusEnum } from '../enums/task-status-enum';

export class CreateTaskDto {
  title: string;
  descrition: string | null;
  status: TaskStatusEnum | null;
  createdAt: Date;
  updatedAt: Date;
}
