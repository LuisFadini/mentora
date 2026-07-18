import { IsNumber, IsString } from "class-validator";

export class CreateQuestionTipDTO {
  @IsNumber()
  order!: number;

  @IsString()
  content!: string;
}
