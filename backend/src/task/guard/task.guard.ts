import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: any) {
    // Get user id.
    const userId = req.user.id;

    // Get task id.
    const taskId = req.params.id;

    if (isNaN(+taskId)) {
      throw new BadRequestException(
        `Id provided: '${taskId}' not valid integer.`,
      );
    }

    // Find the task by id.
    const task = await this.prisma.task.findFirst({
      where: {
        id: +taskId,
      },
    });

    // If no task found
    if (!task) {
      throw new BadRequestException(`Task with id: '${taskId}' not found`);
    }

    // Check if the task's userId is the same as the userId calling this route.
    if (task.userId !== userId) {
      throw new UnauthorizedException("This task does't belong to you");
    }

    // Attach the task to the request.
    req.task = task;

    return true;
  }
}
