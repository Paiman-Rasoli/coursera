import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../auth/entities/user.entity';

@Resolver(() => List)
export class ListResolver {
  constructor(private readonly listService: ListService) {}

  @Mutation(() => List)
  createList(
    @Args('createList') createListInput: CreateListInput,
    @CurrentUser() user,
  ) {
    return this.listService.create(createListInput, user.sub);
  }

  @Query(() => [List], { name: 'getAllLists' })
  findAll() {
    return this.listService.findAll();
  }

  @Query(() => List, { name: 'findOneList' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listService.findOne(id);
  }

  @Mutation(() => List)
  updateList(@Args('updateList') updateListInput: UpdateListInput) {
    return this.listService.update(updateListInput.id, updateListInput);
  }

  @Mutation(() => List, { name: 'deleteList' })
  removeList(@Args('id', { type: () => Int }) id: number) {
    return this.listService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() list: List) {
    return this.listService.getUser(list.userId);
  }
}
