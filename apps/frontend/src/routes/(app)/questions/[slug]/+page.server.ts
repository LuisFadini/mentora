import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { questions } from "$lib/mock-data";

export const load: PageServerLoad = async ({ params }) => {
  const question = questions.find((q) => q.id === params.slug);

  if (question) {
    return { question };
  }

  error(404, "Not found");
};
