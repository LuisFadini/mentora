import { IsBoolean, IsString } from "class-validator";

export class CreateAnswerDTO {
  @IsBoolean()
  correct!: boolean;

  @IsString()
  content!: string;
}
