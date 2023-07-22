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
import { GetUser } from '../auth/decorator';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { GetTask } from './decorator';
import { Task } from '@prisma/client';
import { TaskGuard } from './guard';

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

  @UseGuards(TaskGuard)
  @Get('get/:id')
  findOne(@GetTask() task: Task) {
    return task;
  }

  @UseGuards(TaskGuard)
  @Patch('update/:id')
  update(@Body() updateTaskDto: UpdateTaskDto, @GetTask() task: Task) {
    return this.taskService.update(updateTaskDto, task);
  }

  @UseGuards(TaskGuard)
  @Delete('delete/:id')
  remove(@GetTask('id') taskId: number) {
    return this.taskService.remove(taskId);
  }
}
