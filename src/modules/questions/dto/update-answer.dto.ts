import { IsDefined, IsString } from 'class-validator'
export class UpdateAnswerDTO {
  @IsDefined()
  @IsString()
  idQuestion?: string;

  @IsDefined()
  @IsString()
  answerBody?: string;
}
