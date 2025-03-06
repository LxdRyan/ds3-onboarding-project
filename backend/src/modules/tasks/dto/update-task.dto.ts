import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class UpdateTaskDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contents: string;

  @IsNumber()
  @IsOptional()
  creator: number;

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
