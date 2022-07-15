import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  hashedRt: String;

  @Column()
  fullName: string;

  @Column()
  createdAt: string;

  @Column({ default: false })
  status: boolean;
}
