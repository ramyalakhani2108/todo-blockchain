import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  findAll() {
    return this.todoRepo.find();
  }

  create(task: string) {
    const todo = this.todoRepo.create({ task });
    return this.todoRepo.save(todo);
  }

  async toggleComplete(id: number) {
    const todo = await this.todoRepo.findOne({ where: { id } });
    if(!todo)
    todo.completed = !todo?.completed ? true : false;
    return this.todoRepo.save(todo);
  }
}