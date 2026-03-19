import { IsDefined, IsString } from 'class-validator'
export class CreateAnswerDTO {
  @IsDefined()
  @IsString()
  idQuestion!: string;

  @IsDefined()
  @IsString()
  answerBody!: string;
}
