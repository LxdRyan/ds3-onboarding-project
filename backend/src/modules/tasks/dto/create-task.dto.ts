import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateUserDTO {
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
  creator: number;

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
