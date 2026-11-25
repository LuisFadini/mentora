import { IsNotEmpty, IsString } from "class-validator";

export class UploadQuestionImageDTO {
  @IsString()
  @IsNotEmpty()
  image!: string;
}
