import { IsArray, IsDate, IsDefined, IsString } from "class-validator";
export class CreateQuestion {
  @IsDefined()
  @IsString()
  title!: string;

  @IsDefined()
  @IsString()
  subjects!: string;

  @IsDefined()
  @IsString()
  body!: string;

  @IsDefined()
  @IsArray()
  answers!: string[];

  @IsDefined()
  @IsDate()
  createAt!: Date;

  @IsDefined()
  @IsDate()
  updateAt!: Date;
}
