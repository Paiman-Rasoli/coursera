import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}
  doLogin(): string {
    this.usersRepository.find().then((res) => {
      console.log('res', res);
    });
    return 'Login Done';
  }
  findOneUser(email: string): any {
    return this.usersRepository.findOneBy({
      email: email,
    });
  }
  private hashPassword(password: string): Promise<string> {
    const salt = 10;
    const hashData = hash(password, salt);
    return hashData;
  }
  async doSignup(body: {
    email: string;
    fullName: string;
    password: string;
  }): Promise<any> {
    // Check If User Not Exist
    const found = await this.findOneUser(body.email);
    if (found) {
      throw new BadRequestException({ msg: 'user already taken' });
    }
    // create a user
    const passwordHashed = await this.hashPassword(body.password);
    try {
      return this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email: body.email,
            fullName: body.fullName,
            password: passwordHashed,
            status: true,
            createdAt: new Date().toISOString(),
          },
        ])
        .execute();
    } catch (err) {
      console.log('errror ', err);
      throw new InternalServerErrorException({ msg: 'Internal Server Error' });
    }
  }
}
