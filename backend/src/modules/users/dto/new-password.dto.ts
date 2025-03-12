import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
