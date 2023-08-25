import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { ListService } from '../list/list.service';
import { existedTask, taskInput } from './__mock__/task.mock';

type TaskRepository = Repository<Task>;

describe('Task service', () => {
  let taskRepository: TaskRepository;
  let listService: ListService;
  let taskService: TaskService;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn().mockResolvedValue(existedTask),
      find: jest.fn().mockResolvedValue([existedTask]),
    } as unknown as TaskRepository;
    listService = {} as ListService;
    taskService = new TaskService(taskRepository, listService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('create', () => {
    it('create a new task to a specific list', async () => {
      const newTask = await taskService.create(taskInput);
      expect(taskRepository.save).toHaveBeenCalledWith(taskInput);
      expect(newTask).toMatchObject(existedTask);
    });
  });

  describe('find', () => {
    it('returns list of creates tasks', async () => {
      const tasks = await taskService.findAll();
      expect(tasks).toBeTruthy();
      expect(tasks.length).toBeGreaterThan(0);
    });
  });
});
