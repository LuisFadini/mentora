<script lang="ts">
  //let { params }: PageProps = $props();
  import type { PageProps } from "./$types";
  import QuestionTextField from "$lib/components/question/+QuestionTextField.svelte";
  import AnswerField from "$lib/components/question/AnswerField.svelte";
  import { updateQuestion } from "$lib/api/questions/update-question";
  import { ApiError } from "$lib/api/api-error";
  let { params }: PageProps = $props();

  let error = $state("");

  let isAnswers: boolean = $state(false);
  let title = $state("");
  let subject = $state("");
  let content = $state("");
  let source = $state("");
  let answer_1 = $state("");
  let answer_2 = $state("");
  let corret_1: boolean = $state(false);
  let corret_2: boolean = $state(false);

  let isBlank = $derived(
    title.trim() != "" &&
      subject.trim() != "" &&
      content.trim() != "" &&
      answer_1.trim() != "" &&
      answer_2.trim() != "",
  );
  async function submitChanges() {
    if (!isBlank) return;
    try {
      await updateQuestion(params.slug, {
        newTitle: title.trim(),
        newContent: content.trim(),
        newSource: source.trim(),
        newSubjects: [subject.trim()],
        newAnswers: [
          { content: answer_1, correct: corret_1 },
          { content: answer_2, correct: corret_2 },
        ],
      });
    } catch (err) {
      if (err instanceof ApiError) {
        switch (err.status) {
          case 400:
            error = "";
            break;
          default:
            error = "Error ao atualizar questao";
            break;
        }
      } else {
        error = "Error na Conexao com o Servidor";
      }
    }
  }
</script>

<main class="min-h-screen flex items-center justify-center p-4">
  <div
    class="flex w-full max-w-4xl flex-col gap-2 rounded-xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_black] sm:p-6"
  >
    {error}
    <div class="flex flex-col justify-center items-center">
      <h1 class="relative inline-block text-4xl font-black leading-none my-2">
        <span class="bg-blue-100"> Editor Questao </span>
      </h1>
      <form onsubmit={submitChanges} class="flex flex-col gap-1.5">
        {#if !isAnswers}
          <QuestionTextField
            title="Titulo Novo"
            bind:bindValue={title}
            placeValue="Insira Novo Titulo"
          />
          <QuestionTextField
            title="Materias Novas"
            bind:bindValue={subject}
            placeValue="Insira outra Materia"
          />

          <QuestionTextField
            title="Fonte"
            bind:bindValue={source}
            placeValue="Insira outra Fonte"
          />
          <QuestionTextField
            title="Enunciado"
            bind:bindValue={content}
            placeValue="Insira Outro Enunciado"
          />
        {:else if isAnswers}
          <AnswerField
            title="Resposta 1"
            bind:bindAnswer={answer_1}
            bind:bindisCorrent={corret_1}
            placeValue="Insira Nova Resposta"
          />
          <AnswerField
            title="Resposta 2"
            bind:bindAnswer={answer_2}
            bind:bindisCorrent={corret_2}
            placeValue="Insira Nova Resposta"
          />
        {/if}
        <div class="flex justify-around gap-3 my-3">
          <div>
            <button
              onclick={() => (isAnswers = false)}
              class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
              disabled={!isAnswers}
            >
              Return
            </button>
            <button
              type="submit"
              class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
              >Update</button
            >
            <button
              onclick={() => (isAnswers = true)}
              class="mx-1 shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
              disabled={isAnswers}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
