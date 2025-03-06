import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  profile_picture?: Buffer;
}
