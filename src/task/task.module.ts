import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { ListModule } from '../list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ListModule],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
