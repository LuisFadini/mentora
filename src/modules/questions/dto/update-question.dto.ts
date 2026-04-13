import { IsArray, IsDefined, IsString } from "class-validator";
export class UpdateQuestion {
  @IsDefined()
  @IsString()
  title?: string;

  @IsDefined()
  @IsString()
  subjects?: string;

  @IsDefined()
  @IsString()
  body?: string;

  @IsDefined()
  @IsArray()
  answers?: string[];

  // Nao Acho Que Faca Muito Sentindo Atualizar o Data De Criacao
}
