<script lang="ts">
  import Icon from "@iconify/svelte";

  import { resolve } from "$app/paths";

  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { questions } = $derived(data);

  const subjects = $derived([
    "Todas",
    ...new Set(questions.flatMap((q) => q.subjects)),
  ]);

  let selectedSubject = $state("Todas");

  const filteredQuestions = $derived(
    selectedSubject === "Todas"
      ? questions
      : questions.filter((q) => q.subjects.includes(selectedSubject)),
  );
</script>

<main class="min-h-screen flex items-center justify-center p-4">
  <section
    class="flex w-full max-w-3xl flex-col gap-2 rounded-xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_black] sm:p-6"
  >
    <h1 class="text-3xl font-black leading-none sm:text-4xl">Questões</h1>

    <div class="flex flex-col gap-1.5">
      <label class="font-semibold" for="subject">Matéria</label>

      <div
        class="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 transition-all focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_0_black]"
      >
        <Icon class="text-xl" icon="ph:book-open-text" />

        <select
          id="subject"
          class="w-full cursor-pointer appearance-none bg-transparent py-3 outline-none"
          onchange={(e) => e.currentTarget.blur()}
          bind:value={selectedSubject}
        >
          {#each subjects as subject (subject)}
            <option value={subject}>
              {subject}
            </option>
          {/each}
        </select>

        <Icon class="pointer-events-none text-xl" icon="ph:caret-down" />
      </div>
    </div>

    <hr
      class="h-2 rounded-xl border-2 border-black bg-blue-400 shadow-[2px_2px_0_0_black]"
    />

    <ul class="flex flex-col gap-2">
      {#each filteredQuestions as question (question.id)}
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
              <div class="flex flex-wrap gap-2">
                {#each question.subjects as subject (subject)}
                  <span
                    class="rounded-full border-2 border-blue-400 bg-blue-200 px-2"
                  >
                    {subject}
                  </span>
                {/each}
              </div>

              <span class="hidden sm:inline text-neutral-500">•</span>

              <p>Fonte: {question.source}</p>
            </div>
          </div>

          <a
            class="w-full shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
            href={resolve("/(app)/questions/[slug]", { slug: question.id })}
          >
            Fazer
          </a>
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
