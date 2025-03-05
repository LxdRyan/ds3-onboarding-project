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
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USER', 'postgres'),
      password: this.configService.get<string>('DB_PASS', 'password'),
      database: this.configService.get<string>('DB_NAME', 'mydb'),
      entities: [User, Task],
      synchronize: this.configService.get<boolean>('DB_SYNC', false), // set to false in production and use migrations
    };
  }
}
