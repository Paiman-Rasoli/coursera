import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskInputDto, TaskIdDto } from './dto';
import { Tasks } from './task.entity';
import { TaskService } from './task.service';
import { TaskUpdateInputDto } from './dto/task.dto';

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
  @Mutation(() => Tasks, { name: 'updateTask', nullable: true })
  async update(
    @Args('taskUpdateInput') task: TaskUpdateInputDto,
  ): Promise<Tasks> {
    return this.taskService.update(task);
  }

  @Mutation(() => Tasks, { name: 'deleteTask', nullable: true })
  async deleteTask(@Args('id') meta: TaskIdDto): Promise<Tasks> {
    return this.taskService.deleteTask(meta);
  }
}
