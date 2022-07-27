import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskInputDto } from './dto';
import { Tasks } from './task.entity';

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
    console.log('Task.', task);
    return this.taskRepository.save({
      name: task.name,
      isDone: task.isDone,
      desc: task.desc,
    });
  }
}
