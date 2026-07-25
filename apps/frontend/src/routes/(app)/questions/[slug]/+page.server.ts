import { error } from "@sveltejs/kit";

import { getQuestion } from "$lib/api/questions/get-question";
import { getQuestionTips } from "$lib/api/questions/get-question-tips";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const question = await getQuestion(params.slug, fetch);
  const tips = await getQuestionTips(params.slug, fetch);

  if (question) {
    return {
      question,
      tipsAvailable: tips.length,
    };
  }

  error(404, "Not found");
};
