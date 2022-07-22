import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskInputDto } from './dto';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [TaskEntity], { name: 'getAllTasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Mutation(() => TaskEntity, { name: 'createTask', nullable: true })
  async create(@Args('taskInput') task: TaskInputDto): Promise<TaskEntity> {
    console.log('Args => ', task);
    return this.taskService.create(task);
  }
}
