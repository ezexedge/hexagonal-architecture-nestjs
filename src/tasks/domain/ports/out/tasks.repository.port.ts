import { Task } from '../../entities/tasks.entity';

export interface TaskRepositoryPort {
  save(task: Task): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Task>;
  findAll(): Promise<Task[]>;
}
