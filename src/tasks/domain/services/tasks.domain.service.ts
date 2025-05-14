import { Injectable, Inject } from '@nestjs/common';
import { Task } from '../entities/tasks.entity';
import { TaskServicePort } from '../ports/in/tasks.service.port';
import { TaskRepositoryPort } from '../ports/out/tasks.repository.port';
import { TASK_REPOSITORY_PORT } from '../constans/tokens';

@Injectable()
export class TaskDomainService implements TaskServicePort {
  constructor(
    @Inject(TASK_REPOSITORY_PORT)
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async createTask(task: Task): Promise<Task> {
    if (!task.title) {
      throw new Error('Task title is required');
    }

    return this.taskRepository.save(task);
  }

  async updateTask(id: string, taskUpdates: Partial<Task>): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error('Task not found');
    }

    const updatedTask = new Task({
      ...existingTask,
      ...taskUpdates,
      updatedAt: new Date(),
    });

    return this.taskRepository.update(id, updatedTask);
  }

  async deleteTask(id: string): Promise<boolean> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error('Task not found');
    }

    return this.taskRepository.delete(id);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }
}
