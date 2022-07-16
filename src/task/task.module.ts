import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [],
  providers: [TaskService, TaskResolver],
  exports: [],
})
export class TaskModule {}
