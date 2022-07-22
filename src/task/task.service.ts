import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskInputDto } from './dto';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}
  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find({});
  }

  async create(task: TaskInputDto): Promise<TaskEntity> {
    console.log('Task.', task);
    return this.taskRepository.save({
      name: task.name,
      isDone: task.isDone,
      desc: task.desc,
    });
  }
}
