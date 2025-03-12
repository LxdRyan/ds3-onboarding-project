import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
