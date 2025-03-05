import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { usersModule } from './modules/users/users.module';
import { tasksModule } from './modules/tasks/tasks.module';
import { TypeOrmConfigService } from './database/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfigService), usersModule, tasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
