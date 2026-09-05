<script lang="ts">
  import PageContainer from "$lib/components/PageContainer.svelte";
  import Separator from "$lib/components/Separator.svelte";

  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { history } = $derived(data);

  const totalAnswered = $derived(history.length);
  const correctAnswers = $derived(
    history.filter((h) => h.answer.correct).length,
  );
  const wrongAnswers = $derived(totalAnswered - correctAnswers);
</script>

<main
  class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 pt-16"
>
  <PageContainer class="flex w-full max-w-3xl flex-col p-4 sm:p-6" as="section">
    <header class="my-3 text-center">
      <h1 class="my-2 text-2xl font-bold tracking-tight sm:text-3xl">
        Histórico de questões
      </h1>

      <Separator class="mx-auto w-20 bg-blue-400" />
    </header>

    {#if history.length === 0}
      <section
        class="rounded-xl border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0_0_black]"
      >
        <h2 class="text-lg font-bold">Nenhuma questão respondida</h2>

        <p class="mt-2 text-sm text-neutral-500">
          Seu histórico aparecerá aqui depois que você responder alguma questão.
        </p>
      </section>
    {:else}
      <div class="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          class="rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_black]"
        >
          <p class="text-sm font-medium text-neutral-500">Total respondidas</p>
          <p class="mt-1 text-3xl font-black">{totalAnswered}</p>
        </div>
        <div
          class="rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_black]"
        >
          <p class="text-sm font-medium text-neutral-500">Respostas corretas</p>
          <p class="mt-1 text-3xl font-black text-green-600">
            {correctAnswers}
          </p>
        </div>
        <div
          class="rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_black]"
        >
          <p class="text-sm font-medium text-neutral-500">Respostas erradas</p>
          <p class="mt-1 text-3xl font-black text-red-600">{wrongAnswers}</p>
        </div>
      </div>

      <ul
        class="flex max-h-[50vh] flex-col gap-3 overflow-x-hidden overflow-y-auto pr-2 pb-1"
        aria-label="Histórico de questões respondidas"
      >
        {#each history as entry (entry.id)}
          <li
            class="flex flex-col gap-4 rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_black] sm:flex-row sm:items-center sm:justify-between sm:p-5"
          >
            <div class="min-w-0">
              <h2
                class="truncate text-lg font-bold sm:text-xl"
                title={entry.question.title}
              >
                {entry.question.title}
              </h2>

              <p
                class="mt-1 text-sm font-semibold"
                class:text-green-600={entry.answer.correct}
                class:text-red-600={!entry.answer.correct}
              >
                {entry.answer.correct ? "Resposta correta" : "Resposta errada"}
              </p>
            </div>

            <p class="shrink-0 text-xs text-neutral-500 sm:text-sm">
              {new Date(entry.createdAt).toLocaleString("pt-BR")}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
  </PageContainer>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
