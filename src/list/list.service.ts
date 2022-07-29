import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  create(list: CreateListInput) {
    const taskList = this.listRepository.create({
      name: list.name,
      description: list.description,
      createdAt: new Date().toISOString(),
    });
    return this.listRepository.save(taskList);
  }

  findAll() {
    return this.listRepository.find();
  }

  findOne(id: number) {
    return this.listRepository.findOneBy({ id: id });
  }

  update(id: number, updateListInput: UpdateListInput) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
