import { Task } from '../../entities/tasks.entity';

export interface TaskServicePort {
  createTask(task: Task): Promise<Task>;
  updateTask(id: string, task: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
  getAllTasks(): Promise<Task[]>;
}
