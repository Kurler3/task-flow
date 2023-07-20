import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class TaskMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const userId = (req.user as User).id;
    const taskId = req.params.id;

    // Find task by id.
    const task = await this.prisma.task.findFirst({
      where: {
        id: +taskId,
      },
    });

    // If no task with this id => error
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    // If the task's userId is not equal to the calling user ids => unauthorized
    if (task.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    // Add the task to the request.
    req.task = task;
    // Continue
    next();
  }
}
