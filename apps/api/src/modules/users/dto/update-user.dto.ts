import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from "class-validator";

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
  @IsUrl()
  avatarUrl?: string;
}
