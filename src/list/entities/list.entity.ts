import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../auth/entities/user.entity';

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
  tasks?: Task[];

  @ManyToOne(() => User, (user) => user.lists)
  @Field(() => User)
  user?: User;

  @Column()
  @Field()
  userId: number;
}
