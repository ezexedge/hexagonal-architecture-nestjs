export class Task {
  id?: string;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data?: Partial<Task>) {
    if (data) {
      this.title = data.title;
      this.description = data.description;
      this.createdAt = data.createdAt || new Date();

      if (data.updatedAt) {
        this.updatedAt = data.updatedAt;
      }
    }
  }
}
