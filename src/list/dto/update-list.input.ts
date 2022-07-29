import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateListInput {
  @Field()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsOptional()
  description: string;
}
