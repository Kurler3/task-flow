import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskMiddleware } from './task.middleware';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TaskMiddleware).forRoutes('task/:id');
  }
}
