import { IsString, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contents: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  due_date: Date;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  priority: string;
}
