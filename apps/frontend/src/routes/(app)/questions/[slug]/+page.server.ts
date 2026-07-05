import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import { getQuestion } from "$lib/api/questions/get-question";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeStringify);

const renderMarkdown = async (markdown: string) =>
  String(await processor.process(markdown));

export const load: PageServerLoad = async ({ params, fetch }) => {
  const question = await getQuestion(params.slug, fetch);

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
    };
  }

  error(404, "Not found");
};
