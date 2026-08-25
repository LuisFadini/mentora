<script lang="ts">
  import Icon from "@iconify/svelte";

  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import MarkdownTextarea from "./MarkdownTextarea.svelte";

  type Props = {
    answer: string;
    answerError: string;
    answers: string[];
    correctAnswer: number | null;
    handleAnswerKeydown: (event: KeyboardEvent) => void;
    validateAnswer: () => void;
    remove: (items: string[], index: number) => void;
  };

  let {
    answer = $bindable(),
    answerError = $bindable(),
    answers,
    correctAnswer = $bindable(),
    handleAnswerKeydown,
    validateAnswer,
    remove,
  }: Props = $props();
</script>

<MarkdownTextarea
  id="answer"
  class="max-h-3"
  label="Resposta"
  onKeydown={handleAnswerKeydown}
  onValidate={validateAnswer}
  placeholder="Escreva uma resposta..."
  bind:value={answer}
  bind:error={answerError}
/>

<p class="text-xs text-neutral-500">
  <kbd class="font-bold">Ctrl</kbd> +
  <kbd class="font-bold">Enter</kbd>
  para adicionar.
</p>

{#if answers.length}
  <div class="flex max-h-64 flex-col gap-3 overflow-y-auto pr-2">
    {#each answers as item, index (item)}
      <div
        class="group flex items-start gap-3 rounded-lg border-2 border-black bg-white px-4 py-4 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_black]"
      >
        <input
          id={`answer-${index}`}
          name="answer"
          class="mt-1 h-4 w-4 shrink-0 accent-black"
          type="radio"
          value={index}
          bind:group={correctAnswer}
        />

        <label class="min-w-0 flex-1 cursor-pointer" for={`answer-${index}`}>
          <MarkdownRenderer class="text-sm leading-relaxed" markdown={item} />
        </label>

        <button
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-black bg-white transition-colors hover:bg-red-400"
          onclick={() => remove(answers, index)}
          type="button"
        >
          <Icon icon="ph:x-bold" />
        </button>
      </div>
    {/each}
  </div>
{:else}
  <p class="py-4 text-center text-sm text-neutral-500">
    Adicione pelo menos uma resposta.
  </p>
{/if}
