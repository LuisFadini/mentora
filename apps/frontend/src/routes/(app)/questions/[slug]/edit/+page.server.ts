import { error } from "@sveltejs/kit";

import { getQuestion } from "$lib/api/questions/get-question";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const question = await getQuestion(params.slug, fetch);

  if (question) {
    return {
      question,
    };
  }

  error(404, "Not found");
};
