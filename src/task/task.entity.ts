import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// generate graphql schema
@ObjectType()
@Entity()
export class TaskEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isDone: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  desc?: string;
}
