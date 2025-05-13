import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDBConfigModule } from './tasks/infrastructure/config/database/mongodb.config';
import { TaskModule } from './tasks/infrastructure/tasks.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongoDBConfigModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}