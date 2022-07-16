import { Field, ObjectType } from '@nestjs/graphql';
// generate graphql schema
@ObjectType()
export class TaskModels {
  @Field()
  name: string;

  @Field({ nullable: true })
  desc: string;
}
