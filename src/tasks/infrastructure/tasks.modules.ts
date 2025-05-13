import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskDocument,
  TaskSchema,
} from './adapters/out/mongodb/schemas/tasks.schema';
import { TaskController } from './adapters/in/tasks.controller';
import { TaskApplicationService } from '../application/services/tasks.application.service';
import { TaskDomainService } from '../domain/services/tasks.domain.service';
import { TaskRepository } from './adapters/out/mongodb/repositories/tasks.mongodb.repository';

export const TASK_SERVICE_PORT = Symbol('TASK_SERVICE_PORT');
export const TASK_REPOSITORY_PORT = Symbol('TASK_REPOSITORY_PORT');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskDocument.name, schema: TaskSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: TASK_REPOSITORY_PORT,
      useClass: TaskRepository,
    },
    {
      provide: TASK_SERVICE_PORT,
      useFactory: (taskRepositoryPort) =>
        new TaskDomainService(taskRepositoryPort),
      inject: [TASK_REPOSITORY_PORT],
    },
    {
      provide: TaskApplicationService,
      useFactory: (taskServicePort) =>
        new TaskApplicationService(taskServicePort),
      inject: [TASK_SERVICE_PORT],
    },
    TaskRepository,
  ],
  exports: [
    TaskApplicationService,
    TASK_SERVICE_PORT,
    TASK_REPOSITORY_PORT,
    TaskRepository,
  ],
})
export class TaskModule {}
