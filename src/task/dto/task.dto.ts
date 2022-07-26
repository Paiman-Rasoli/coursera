import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class TaskInputDto {
  // generate graphql schema
  @Field()
  @IsNotEmpty({ message: 'Oops, name is reqired!' })
  name: string;
  @IsBoolean({ message: 'Invalid Value!' })
  @Field()
  isDone: boolean;

  @Field({ nullable: true })
  @IsOptional()
  desc?: string;
}