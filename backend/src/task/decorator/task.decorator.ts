import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Task } from '@prisma/client';

export const GetTask = createParamDecorator(
  (data: keyof Task, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.task) return null;
    if (data) {
      return request.task[data];
    }
    return request.task;
  },
);
