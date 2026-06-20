import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @MinLength(4)
  name!: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password!: string;

  @IsDefined()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
