import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Users, Tasks } from './entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USER', 'myuser'),
      password: this.configService.get<string>('DB_PASS', 'mypassword'),
      database: this.configService.get<string>('DB_NAME', 'mydatabase'),
      autoLoadEntities: true,
      synchronize: this.configService.get<boolean>('DB_SYNC', false), // set to false in production and use migrations
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations',
      migrationsRun: this.configService.get<boolean>('DB_MIGRATIONS_RUN', true),
    };
  }
}
