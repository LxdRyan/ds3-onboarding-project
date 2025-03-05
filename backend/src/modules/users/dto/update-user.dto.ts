import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  profilePicture?: Buffer;
}
