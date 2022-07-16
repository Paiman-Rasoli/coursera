import { Query, Resolver } from '@nestjs/graphql';
import { TaskModels } from './models/task.models';

@Resolver(() => TaskModels)
export class TaskResolver {
  @Query(() => TaskModels)
  findAll() {}
}
