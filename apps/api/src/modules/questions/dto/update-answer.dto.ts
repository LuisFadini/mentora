import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateAnswerDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsBoolean()
  correct!: boolean;

  @IsString()
  content!: string;

  @IsOptional()
  @IsBoolean()
  delete?: boolean;
}
