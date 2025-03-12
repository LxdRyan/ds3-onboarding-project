import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDTO {
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
  @Transform(({ value }) => new Date(value))
  due_date: Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  priority: string;
}
