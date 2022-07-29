import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@ObjectType()
@Entity()
export class List {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: 'N/A' })
  description: string;

  @Field()
  @Column()
  createdAt: string;

  @OneToMany(() => Task, (task) => task.list)
  @Field(() => [Task], { nullable: true })
  tasks: Task[];
}
