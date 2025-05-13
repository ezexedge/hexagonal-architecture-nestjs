import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from '../../../application/dtos/create-tasks.dto';
import { UpdateTaskDto } from '../../../application/dtos/update-tasks.dto';
import { TaskApplicationService } from 'src/tasks/application/services/tasks.application.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskApplicationService: TaskApplicationService,
  ) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskApplicationService.createTask(createTaskDto);
  }

  @Get()
  async getAllTasks() {
    return this.taskApplicationService.getAllTasks();
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskApplicationService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string) {
    await this.taskApplicationService.deleteTask(id);
  }
}
