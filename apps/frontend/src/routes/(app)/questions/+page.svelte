<script lang="ts">
  type Question = {
    id: string;
    title: string;
    source: string;
    subject: string;
    content: string;
    answers: Answer[];
  };

  type Answer = {
    correct: boolean;
    content: string;
  };

  const questions: Question[] = [
    {
      id: "019f1569-236c-78db-9466-b6290799b98c",
      title: "Lorem ipsum dolor sit amet",
      source: "Lorem University",
      subject: "Lorem Studies",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      answers: [
        {
          correct: false,
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          correct: false,
          content: "Consectetur adipiscing elit.",
        },
        {
          correct: true,
          content: "Sed do eiusmod tempor incididunt.",
        },
        {
          correct: false,
          content: "Ut enim ad minim veniam.",
        },
      ],
    },
    {
      id: "019f1569-236c-7d5a-97ee-c45a2a7cc29b",
      title: "Dolor sit amet consectetur",
      source: "Ipsum Institute",
      subject: "Placeholder Science",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      answers: [
        {
          correct: true,
          content: "Duis aute irure dolor in reprehenderit.",
        },
        {
          correct: false,
          content: "Excepteur sint occaecat cupidatat non proident.",
        },
        {
          correct: false,
          content: "Sunt in culpa qui officia deserunt.",
        },
        {
          correct: false,
          content: "Mollit anim id est laborum.",
        },
      ],
    },
  ];
</script>

<main class="min-h-screen flex items-center justify-center p-4">
  <section
    class="flex w-full max-w-3xl flex-col gap-2 rounded-xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_black] sm:p-6"
  >
    <h1 class="text-3xl font-black leading-none sm:text-4xl">Questões</h1>

    <hr
      class="h-2 rounded-xl border-2 border-black bg-blue-400 shadow-[2px_2px_0_0_black]"
    />

    <ul class="flex flex-col gap-2">
      {#each questions as question (question.id)}
        <li
          class="flex flex-col gap-4 rounded-xl border-2 border-black px-4 py-3 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_black] sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <p class="text-lg font-semibold sm:text-xl">
              {question.title}
            </p>

            <div
              class="flex flex-wrap items-center gap-2 text-sm text-neutral-600"
            >
              <span
                class="rounded-full border-2 border-blue-400 bg-blue-200 px-2"
              >
                {question.subject}
              </span>

              <span class="hidden sm:inline text-neutral-500">•</span>

              <p>Fonte: {question.source}</p>
            </div>
          </div>

          <button
            class="w-full shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
          >
            Fazer
          </button>
        </li>
      {/each}
    </ul>
  </section>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
