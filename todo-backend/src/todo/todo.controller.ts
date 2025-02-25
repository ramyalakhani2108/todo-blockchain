import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body() body: { task: string }) {
    return this.todoService.create(body.task);
  }

  @Patch(':id')
  toggleComplete(@Param('id') id: string) {
    return this.todoService.toggleComplete(Number(id));
  }
}