import { Injectable, Inject } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-tasks.dto';
import { TaskServicePort } from 'src/tasks/domain/ports/in/tasks.service.port';
import { Task } from 'src/tasks/domain/entities/tasks.entity';
import { UpdateTaskDto } from '../dtos/update-tasks.dto';
import { TASK_SERVICE_PORT } from 'src/tasks/infrastructure/tasks.modules';

@Injectable()
export class TaskApplicationService {
  constructor(
    @Inject(TASK_SERVICE_PORT)
    private readonly taskService: TaskServicePort,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
    };

    const task = new Task(taskData);

    return this.taskService.createTask(task);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updateData: Partial<Task> = {
      title: updateTaskDto.title,
      description: updateTaskDto.description,
    };

    return this.taskService.updateTask(id, updateData);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskService.deleteTask(id);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}
