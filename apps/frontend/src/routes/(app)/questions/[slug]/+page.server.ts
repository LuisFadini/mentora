import { error } from "@sveltejs/kit";

import { getQuestion } from "$lib/api/questions/get-question";
import { getQuestionTips } from "$lib/api/questions/get-question-tips";
import { renderMarkdown } from "$lib/render-markdown";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const question = await getQuestion(params.slug, fetch);
  const tips = await getQuestionTips(params.slug, fetch);

  if (question) {
    return {
      question: {
        ...question,
        html: await renderMarkdown(question.content),
        answers: await Promise.all(
          question.answers.map(async (a) => ({
            ...a,
            html: await renderMarkdown(a.content),
          })),
        ),
      },
      tipsAvailable: tips.length,
    };
  }

  error(404, "Not found");
};
