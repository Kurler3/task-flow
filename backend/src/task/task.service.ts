import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';

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

  async update(updateTaskDto: UpdateTaskDto, task: Task) {
    // If no keys on the body.
    if (Object.keys(updateTaskDto).length === 0) {
      throw new BadRequestException(
        'Need to provide a body to update this task.',
      );
    }

    // Update the task.
    const updatedTask = await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        ...updateTaskDto,
      },
    });

    return updatedTask;
  }

  async remove(taskId: number) {
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    return `Task with id: '${taskId}' deleted`;
  }
}
