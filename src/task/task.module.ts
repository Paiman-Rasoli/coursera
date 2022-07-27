import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), JwtModule.register({})],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
