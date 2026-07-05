import { IsString } from "class-validator";

export class ValidateQuestionDTO {
  @IsString()
  answerId!: string;
}
