import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from 'src/list/entities/list.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({
    unique: true,
  })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashedRt: string;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  createdAt: string;

  @OneToMany(() => List, (list) => list.user)
  @Field(() => [List], { nullable: true })
  lists: List[];
}
