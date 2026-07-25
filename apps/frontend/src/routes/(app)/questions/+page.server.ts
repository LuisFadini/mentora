import { getQuestions } from "$lib/api/questions/get-questions";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const questions = await getQuestions(fetch);

  return {
    questions: questions,
  };
};
