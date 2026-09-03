import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAttemptDTO {
  @IsDefined()
  @IsString()
  questionId!: string;

  @IsDefined()
  @IsString()
  answerId!: string;

  @IsOptional()
  @IsInt()
  tipsUsed?: number;
}
