import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          ...createTaskDto,
          userId,
        },
      });

      return task;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Something bad happened while creating a task.',
      );
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
