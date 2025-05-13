import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from '../schemas/tasks.schema';
import { TaskRepositoryPort } from 'src/tasks/domain/ports/out/tasks.repository.port';
import { Task } from 'src/tasks/domain/entities/tasks.entity';

@Injectable()
export class TaskRepository implements TaskRepositoryPort {
  constructor(
    @InjectModel(TaskDocument.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async save(task: Task): Promise<Task> {
    const taskDocument = new this.taskModel({
      title: task.title,
      description: task.description,
      createdAt: task.createdAt || new Date(),
      updatedAt: task.updatedAt || new Date(),
    });
    const savedDocument = await taskDocument.save();
    return savedDocument;
  }

  async findById(id: string): Promise<Task | null> {
    const taskDocument = await this.taskModel.findById(id);
    return taskDocument ? this.toTask(taskDocument) : null;
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const updatedDocument = await this.taskModel.findByIdAndUpdate(
      id,
      {
        title: task.title,
        description: task.description,
        updatedAt: new Date(),
      },
      { new: true },
    );

    if (!updatedDocument) {
      throw new Error('Task not found');
    }

    return this.toTask(updatedDocument);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id);
    return !!result;
  }

  async findAll(): Promise<Task[]> {
    const taskDocuments = await this.taskModel.find();
    return taskDocuments.map((doc) => doc);
  }

  private toTask(taskDocument: TaskDocument): Task {
    return new Task(taskDocument);
  }
}
