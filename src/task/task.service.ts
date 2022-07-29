import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskInputDto } from './dto';
import { Tasks } from './task.entity';
import { TaskIdDto, TaskUpdateInputDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}
  findAll(): Promise<Tasks[]> {
    return this.taskRepository.find({});
  }

  async create(task: TaskInputDto): Promise<Tasks> {
    return this.taskRepository.save({
      name: task.name,
      isDone: task.isDone,
      desc: task.desc,
    });
  }

  async update(task: TaskUpdateInputDto): Promise<Tasks> {
    const result = this.taskRepository.findOneBy({ id: task.id });
    this.taskRepository.update({ id: task.id }, task);
    return result;
  }

  async deleteTask(meta: TaskIdDto): Promise<Tasks> {
    const result = await this.taskRepository.findOneBy({ id: meta.id });

    const delte = await this.taskRepository.delete({ id: meta.id });
    console.log(delte);

    return result;
  }
}
