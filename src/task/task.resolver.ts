import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskInputDto } from './dto';
import { Tasks } from './task.entity';
import { TaskService } from './task.service';

@Resolver(() => Tasks)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => [Tasks], { name: 'getAllTasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Mutation(() => Tasks, { name: 'createTask', nullable: true })
  async create(@Args('taskInput') task: TaskInputDto): Promise<Tasks> {
    return this.taskService.create(task);
  }
}
