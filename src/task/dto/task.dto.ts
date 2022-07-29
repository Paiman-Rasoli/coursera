import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

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
  @Field()
  @IsOptional()
  name?: string;

  @IsOptional()
  @Field()
  isDone?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  desc?: string;
}
