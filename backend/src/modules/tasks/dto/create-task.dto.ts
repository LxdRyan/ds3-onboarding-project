import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateTaskDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  contents: string;

  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @IsDate()
  @IsNotEmpty()
  due_date: Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  priority: string;
}
