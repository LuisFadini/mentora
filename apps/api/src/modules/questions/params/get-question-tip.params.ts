import type { GetQuestionParams } from "./get-question.params.ts";

export interface GetQuestionTipParams extends GetQuestionParams {
  tipId: string;
}
