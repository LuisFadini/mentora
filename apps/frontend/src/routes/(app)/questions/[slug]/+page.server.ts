import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { questions } from "$lib/mock-data";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeStringify);

const renderMarkdown = async (markdown: string) =>
  String(await processor.process(markdown));

export const load: PageServerLoad = async ({ params }) => {
  const question = questions.find((q) => q.id === params.slug);

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
