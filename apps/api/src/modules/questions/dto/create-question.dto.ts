import { Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
  ValidateNested,
} from "class-validator";

import { CreateAnswerDTO } from "./create-answer.dto.ts";

export class CreateQuestionDTO {
  @IsString()
  title!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  subjects!: string[];

  @IsString()
  source!: string;

  @IsString()
  content!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDTO)
  answers!: CreateAnswerDTO[];
}
