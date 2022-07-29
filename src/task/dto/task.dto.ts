import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class TaskInputDto {
  // generate graphql schema
  @Field()
  @IsNotEmpty({ message: 'Oops, name is required!' })
  name: string;
  @IsBoolean({ message: 'Invalid Value!' })
  @Field()
  isDone: boolean;

  @Field({ nullable: true })
  @IsOptional()
  desc?: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  listId: number;
}

@InputType()
export class TaskIdDto {
  @Field()
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;
}

@InputType()
export class TaskUpdateInputDto {
  @Field()
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;
  // generate graphql schema
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  isDone?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  desc?: string;
}
