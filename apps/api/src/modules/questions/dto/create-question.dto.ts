import { IsArray, IsDefined, IsString } from "class-validator";

export class CreateQuestionDTO {
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
}
