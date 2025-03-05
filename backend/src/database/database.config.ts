import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User, Task } from './entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'ds3-onboarding-project-database-1'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USER', 'myuser'),
      password: this.configService.get<string>('DB_PASS', 'pmypassword'),
      database: this.configService.get<string>('DB_NAME', 'mydatabase'),
      entities: [User, Task],
      synchronize: this.configService.get<boolean>('DB_SYNC', false), // set to false in production and use migrations
    };
  }
}
