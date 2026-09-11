import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @MinLength(4)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  avatar?: string | null;
}
