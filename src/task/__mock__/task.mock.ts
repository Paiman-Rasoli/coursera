import { TaskInputDto } from '../dto';
import { Task } from '../entities/task.entity';

export const existedTask: Task = {
  id: 1,
  name: 'Create new app',
  isDone: false,
  list: {
    id: 23,
    name: 'First sheet',
    description: 'A short desc',
    createdAt: new Date().toISOString(),
    userId: 44,
  },
  listId: 2,
};

export const taskInput: TaskInputDto = {
  isDone: true,
  name: 'New task',
  listId: 32,
};
