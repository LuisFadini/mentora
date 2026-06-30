<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PageProps } from "./$types";
  import { resolve } from "$app/paths";

  let { data }: PageProps = $props();
  const { question } = $derived(data);

  let selectedAnswer = $state("");

  function handleSubmit() {
    alert(
      `Resposta selecionada: ${
        question.answers.find((a) => a.id === selectedAnswer)!.content
      }`,
    );
  }
</script>

<main
  class="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center p-4"
>
  <section
    class="flex w-full max-w-3xl flex-col rounded-xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_black] sm:p-6"
  >
    <div class="flex items-start justify-between gap-4">
      <h1 class="text-3xl sm:text-4xl font-black leading-none">
        {question.title}
      </h1>

      <a
        href={resolve("/(app)/questions")}
        class="flex size-9 items-center justify-center rounded-lg border-2 border-black bg-red-500 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_black] active:translate-x-0 active:translate-y-0"
      >
        <Icon icon="ph:x-bold" />
      </a>
    </div>

    <div class="mt-3 flex items-center gap-2">
      <span
        class="border-2 border-black bg-blue-300 rounded-sm px-2 py-0.5 text-[11px] font-bold shadow-[2px_2px_0_0_black]"
      >
        {question.subject}
      </span>

      <span class="text-xs text-neutral-600">
        Fonte: {question.source}
      </span>
    </div>

    <p
      class="mt-5 max-w-prose text-sm sm:text-base leading-relaxed font-medium text-justify mx-auto"
    >
      {question.content}
    </p>

    <form class="flex flex-col gap-5 mt-2" novalidate onsubmit={handleSubmit}>
      <div class="flex flex-col gap-3">
        {#each question.answers as answer (answer.id)}
          <label
            class="group flex cursor-pointer items-center gap-3 border-2 border-black rounded-lg bg-white px-4 py-4 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none has-checked:translate-x-0.5 has-checked:translate-y-0.5 has-checked:shadow-none has-checked:bg-blue-200"
          >
            <input
              type="radio"
              name="answer"
              id="answer-{answer.id}"
              value={answer.id}
              bind:group={selectedAnswer}
              class="h-4 w-4 accent-black"
            />

            <span
              class="text-sm font-semibold tracking-tight group-hover:translate-x-0.5 transition-transform"
            >
              {answer.content}
            </span>
          </label>
        {/each}
      </div>

      <div class="flex items-center justify-between gap-3">
        <div></div>

        <button
          type="submit"
          disabled={!selectedAnswer}
          class="flex items-center cursor-pointer gap-2 rounded-lg border-2 border-black px-5 py-3 font-black text-white bg-blue-500 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-none disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
        >
          Enviar
          <Icon icon="ph:check-bold" class="text-lg" />
        </button>
      </div>
    </form>
  </section>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
