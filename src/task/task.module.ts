import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), JwtModule.register({})],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
