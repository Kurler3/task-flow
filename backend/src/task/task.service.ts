import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    try {
      const task: Prisma.TaskCreateInput = {
        user: {
          connect: {
            id: userId,
          },
        },
        ...createTaskDto,
      };

      const createdTask = await this.prisma.task.create({
        data: task,
      });

      return createdTask;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Something bad happened while creating a task.',
      );
    }
  }

  async findAll(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
    });
    return tasks;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
