import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contents: string;

  @IsDate()
  @IsOptional()
  due_date: Date;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  priority: string;
}
