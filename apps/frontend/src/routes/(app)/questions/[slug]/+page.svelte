<script lang="ts">
  import Icon from "@iconify/svelte";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { getQuestionTip } from "$lib/api/questions/get-question-tip";
  import type { QuestionTip } from "$lib/api/questions/types";
  import { validateQuestion } from "$lib/api/questions/validate-question";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import PageContainer from "$lib/components/PageContainer.svelte";
  import MarkdownRenderer from "$lib/components/questions/MarkdownRenderer.svelte";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { question } = $derived(data);

  let tipsUsed = $state(0);
  const tips = $state<QuestionTip[]>([]);
  let isLoadingTip = $state(false);

  let selectedAnswer = $state("");
  let showModal = $state(false);

  let isLoading = $state(false);
  let apiError = $state("");
  let isCorrect = $state<boolean | null>(null);
  let correctAnswerId = $state<string | null>(null);

  async function useTip() {
    if (isLoadingTip) return;
    if (tipsUsed >= data.tipsAvailable) return;

    isLoadingTip = true;

    try {
      const tip = await getQuestionTip(question.id, tipsUsed + 1);

      tips.push(tip);
      tipsUsed++;
    } catch (err) {
      console.error("Failed to fetch tip:", err);
      apiError = "Não foi possível carregar a dica.";
    } finally {
      isLoadingTip = false;
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!selectedAnswer) return;

    isLoading = true;
    apiError = "";

    try {
      const result = await validateQuestion(question.id, {
        answerId: selectedAnswer,
      });

      isCorrect = result.correct;
      correctAnswerId = result.correctAnswerId;

      showModal = true;
    } catch (err) {
      console.error("Validation failed:", err);
      apiError = "Não foi possível conectar ao servidor";
    } finally {
      isLoading = false;
    }
  }

  async function onClose() {
    await goto(resolve("/(app)/questions"));
  }
</script>

<svelte:head>
  <link
    crossorigin="anonymous"
    href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css"
    integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB"
    rel="stylesheet"
  />
</svelte:head>

<Modal {onClose} bind:showModal>
  {#if isCorrect === true}
    <Icon
      class="size-1/2 mx-auto text-green-500"
      icon="ph:circle-wavy-check-fill"
    />

    <h1 class="text-2xl font-bold text-center">Parabéns, você acertou!</h1>
  {:else}
    <Icon class="size-1/2 mx-auto text-red-500" icon="ph:x-circle-fill" />
    <h1 class="text-2xl font-bold">A resposta correta seria:</h1>
    <div class="mt-2">
      {#if correctAnswerId}
        <MarkdownRenderer
          class=""
          markdown={question.answers.find((a) => a.id === correctAnswerId)
            ?.content ?? ""}
        />
      {/if}
    </div>
  {/if}
</Modal>

<main
  class="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center p-4"
>
  <PageContainer class="flex w-full max-w-3xl flex-col p-4 sm:p-6" as="section">
    <div class="flex items-start justify-between gap-4">
      <h1 class="text-3xl sm:text-4xl font-black leading-none">
        {question.title}
      </h1>

      <Button
        class="size-9 p-0"
        icon="ph:x-bold"
        onclick={async () => await goto(resolve("/(app)/questions"))}
        shadowVariant="sm"
        variant="danger"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <!--{#each question.subjects as subject (subject)}
        <span
          class="border-2 border-black bg-blue-300 rounded-sm px-2 py-0.5 text-[11px] font-bold shadow-[2px_2px_0_0_black]"
        >
          {subject}
        </span>
      {/each}-->

      <span class="text-xs text-neutral-600"> Fonte: {question.source} </span>
    </div>

    {#if tips.length}
      <section class="mt-6 space-y-3">
        <h2 class="text-lg font-black">Dicas:</h2>

        {#each tips as tip (tip.id)}
          <MarkdownRenderer
            class="rounded-lg border-2 border-black bg-yellow-100 p-4 shadow-[4px_4px_0_0_black]"
            markdown={tip.content}
          />
        {/each}
      </section>
    {/if}

    <MarkdownRenderer markdown={question.content} />

    <form class="flex flex-col gap-5 mt-2" novalidate onsubmit={handleSubmit}>
      <div class="flex flex-col gap-3">
        {#each question.answers as answer (answer.id)}
          <label
            class="group flex cursor-pointer items-center gap-3 border-2 border-black rounded-lg bg-white px-4 py-4 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_black] active:translate-x-0 active:translate-y-0 active:shadow-none has-checked:translate-x-0.5 has-checked:translate-y-0.5 has-checked:shadow-none has-checked:bg-blue-200"
            for="answer-{answer.id}"
          >
            <input
              id="answer-{answer.id}"
              name="answer"
              class="h-4 w-4 accent-black"
              disabled={isLoading || isCorrect !== null}
              type="radio"
              value={answer.id}
              bind:group={selectedAnswer}
            />

            <MarkdownRenderer
              class="text-sm leading-relaxed"
              markdown={answer.content}
            />
          </label>
        {/each}
      </div>

      <div class="flex items-center justify-between gap-3">
        {#if data.tipsAvailable > 0}
          <Button
            class="px-4 font-black"
            disabled={tipsUsed === data.tipsAvailable}
            onclick={useTip}
          >
            {#if isLoadingTip}
              Carregando...
            {:else}
              {data.tipsAvailable - tipsUsed}
              {data.tipsAvailable - tipsUsed === 1
                ? "dica disponível"
                : "dicas disponíveis"}
            {/if}
          </Button>
        {:else}
          <div></div>
        {/if}

        <Button
          disabled={!selectedAnswer || isLoading || isCorrect !== null}
          icon="ph:check-bold"
          iconClass="text-lg"
          iconPosition="right"
          type="submit"
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </form>
    <ErrorText class="text-center" message={apiError} />
  </PageContainer>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
