import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ATStrategy, RTStrategy } from 'src/auth/strategies';
import { TaskEntity } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), JwtModule.register({})],
  providers: [TaskService, TaskResolver, ATStrategy, RTStrategy],
  exports: [],
})
export class TaskModule {}
