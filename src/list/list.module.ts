import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListResolver } from './list.resolver';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListResolver, ListService],
  exports: [ListService],
})
export class ListModule {}
