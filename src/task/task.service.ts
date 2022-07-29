import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskInputDto } from './dto';
import { Task } from './entities/task.entity';
import { TaskIdDto, TaskUpdateInputDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  findAll(): Promise<Task[]> {
    return this.taskRepository.find({});
  }

  async create(task: TaskInputDto): Promise<Task> {
    return this.taskRepository.save({
      name: task.name,
      isDone: task.isDone,
      desc: task.desc,
    });
  }

  async update(task: TaskUpdateInputDto): Promise<Task> {
    const result = this.taskRepository.findOneBy({ id: task.id });
    this.taskRepository.update({ id: task.id }, task);
    return result;
  }

  async deleteTask(meta: TaskIdDto): Promise<Task> {
    const result = await this.taskRepository.findOneBy({ id: meta.id });

    const delte = await this.taskRepository.delete({ id: meta.id });
    console.log(delte);

    return result;
  }
}
