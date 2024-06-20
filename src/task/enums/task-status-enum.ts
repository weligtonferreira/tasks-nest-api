export enum TaskStatusEnum {
  Pending = 'PENDING',
  Done = 'DONE',
}

export function isValidStatus(status: string): boolean {
  return Object.values(TaskStatusEnum).includes(status as TaskStatusEnum);
}
