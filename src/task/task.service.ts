import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskInputDto } from './dto';
import { Task } from './entities/task.entity';
import { TaskUpdateInputDto } from './dto/task.dto';
import { ListService } from '../list/list.service';
import { List } from '../list/entities/list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private ListService: ListService,
  ) {}
  findAll(): Promise<Task[]> {
    return this.taskRepository.find({});
  }

  async create(task: TaskInputDto): Promise<Task> {
    return this.taskRepository.save({
      name: task.name,
      isDone: task.isDone,
      desc: task.desc,
      listId: task.listId,
    });
  }

  async update(id: number, task: TaskUpdateInputDto): Promise<Task> {
    const taskCopy: Task = this.taskRepository.create(task);
    taskCopy.id = id;
    return this.taskRepository.save(taskCopy);
  }

  async deleteTask(id: number): Promise<Task> {
    const result = await this.taskRepository.findOneBy({ id: id });
    await this.taskRepository.delete({ id: id });
    return result;
  }

  async getList(id: number): Promise<List> {
    return this.ListService.findOne(id);
  }
}
