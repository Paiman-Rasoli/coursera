import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskInputDto {
  // generate graphql schema
  @Field()
  name: string;

  @Field()
  isDone: boolean;

  @Field({ nullable: true })
  desc?: string;
}
