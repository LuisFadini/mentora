import type { GetQuestionParams } from "./get-question.params.ts";

export interface GetQuestionTipByOrderParams extends GetQuestionParams {
  order: string;
}
