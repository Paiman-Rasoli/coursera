import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TaskInputDto, TaskIdDto } from './dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskUpdateInputDto } from './dto/task.dto';
import { List } from '../list/entities/list.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Mutation(() => Task, { name: 'createTask' })
  async create(@Args('taskInput') task: TaskInputDto): Promise<Task> {
    return this.taskService.create(task);
  }
  @Query(() => [Task], { name: 'getAllTasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Mutation(() => Task, { name: 'updateTask' })
  async update(
    @Args('taskUpdateInput') task: TaskUpdateInputDto,
  ): Promise<Task> {
    return this.taskService.update(task.id, task);
  }

  @Mutation(() => Task, { name: 'deleteTask', nullable: true })
  async deleteTask(@Args('id') meta: TaskIdDto): Promise<Task> {
    return this.taskService.deleteTask(meta);
  }
  @ResolveField(() => List)
  list(@Parent() task: Task) {
    return this.taskService.getList(task.listId);
  }
}
