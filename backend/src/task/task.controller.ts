import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { GetTask } from './decorator';
import { Task } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  create(@GetUser('id') userId: number, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(userId, createTaskDto);
  }

  @Get('list')
  findAll(@GetUser('id') userId: number) {
    return this.taskService.findAll(userId);
  }

  @Get('get/:id')
  findOne(@GetTask() task: Task) {
    return task;
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
