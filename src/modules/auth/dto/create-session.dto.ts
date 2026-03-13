import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class CreateSessionDTO {
  @IsDefined()
  @IsString()
  @MinLength(8)
  password!: string;

  @IsDefined()
  @IsEmail()
  email!: string;
}
