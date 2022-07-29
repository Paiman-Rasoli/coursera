import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../../list/entities/list.entity';
// generate graphql schema
@ObjectType()
@Entity()
export class Task {
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

  @ManyToOne(() => List, (list) => list.tasks)
  @Field(() => List)
  list: List;

  @Column()
  @Field()
  listId: number;
}
