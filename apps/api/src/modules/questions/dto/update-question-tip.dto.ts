import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateQuestionTipDTO {
  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  content?: string;
}
