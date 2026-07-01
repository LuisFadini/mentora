<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PageProps } from "./$types";
  import { resolve } from "$app/paths";
  import Modal from "$lib/components/Modal.svelte";
  import { goto } from "$app/navigation";

  let { data }: PageProps = $props();
  const { question } = $derived(data);

  let selectedAnswer = $state("");
  let selectedAnswerHTML = $state("");
  let showModal = $state(false);

  function handleSubmit() {
    const answer = question.answers.find((a) => a.id === selectedAnswer);
    if (!answer) return;

    selectedAnswerHTML = answer.html;
    showModal = true;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css"
    integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB"
    crossorigin="anonymous"
  />
</svelte:head>

<Modal bind:showModal onClose={() => goto(resolve("/(app)/questions"))}>
  <h1 class="text-2xl font-bold">Resposta selecionada:</h1>
  <div class="mt-2">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html selectedAnswerHTML}
  </div>
</Modal>

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

    <div class="question-content">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html question.html}
    </div>

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

            <div class="text-sm leading-relaxed">
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html answer.html}
            </div>
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

  .question-content {
    @apply mx-auto mt-6 w-full max-w-prose text-base leading-relaxed text-neutral-800;

    :global(h1) {
      @apply mt-8 mb-4 text-3xl font-black;
    }

    :global(h2) {
      @apply mt-8 mb-3 text-2xl font-extrabold;
    }

    :global(h3) {
      @apply mt-6 mb-2 text-xl font-bold;
    }

    :global(h1:first-child),
    :global(h2:first-child),
    :global(h3:first-child) {
      @apply mt-0;
    }

    :global(strong) {
      @apply font-bold;
    }

    :global(em) {
      @apply italic;
    }

    :global(p) {
      @apply my-4 text-justify;
    }

    :global(ul),
    :global(ol) {
      @apply my-4 ml-6 space-y-2;
    }

    :global(ul) {
      @apply list-disc;
    }

    :global(ol) {
      @apply list-decimal;
    }

    :global(li) {
      @apply pl-1;
    }

    :global(blockquote) {
      @apply my-5 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 px-4 py-3 italic;
    }

    :global(table) {
      @apply my-6 w-full border-collapse overflow-hidden rounded-lg border-2 border-black;
    }

    :global(th) {
      @apply border-2 border-black bg-blue-200 px-4 py-2 text-center font-black;
    }

    :global(td) {
      @apply border-2 border-black px-4 py-2 text-center;
    }

    :global(tbody tr:nth-child(even)) {
      @apply bg-neutral-100;
    }

    :global(code) {
      @apply rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-sm;
    }

    :global(pre) {
      @apply my-5 overflow-x-auto rounded-lg border-2 border-black bg-neutral-900 p-4 text-white;

      code {
        @apply bg-transparent p-0 text-inherit;
      }
    }

    :global(a) {
      @apply font-semibold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-900;
    }

    :global(hr) {
      @apply my-8 border-black;
    }

    :global(.katex-display) {
      @apply my-6 overflow-x-visible;
    }

    :global(.katex) {
      font-size: 1.05em;
      vertical-align: baseline;
    }
  }
</style>
