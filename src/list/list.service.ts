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

  create(list: CreateListInput, uid) {
    const taskList = this.listRepository.create({
      name: list.name,
      description: list.description,
      createdAt: new Date().toISOString(),
      userId: uid,
    });
    return this.listRepository.save(taskList);
  }

  findAll() {
    return this.listRepository.find({ relations: ['tasks'] });
  }

  findOne(id: number) {
    return this.listRepository.findOne({
      relations: ['tasks'],
      where: { id: id },
    });
  }

  update(id: number, updateListInput: UpdateListInput) {
    const list: List = this.listRepository.create(updateListInput);
    list.id = id;
    return this.listRepository.save(list);
  }

  remove(id: number) {
    const find = this.findOne(id);
    this.listRepository.delete(id);
    return find;
  }
}
