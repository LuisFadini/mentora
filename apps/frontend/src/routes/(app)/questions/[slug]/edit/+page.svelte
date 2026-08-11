<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { updateQuestion } from "$lib/api/questions/update-question";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import AnswerField from "$lib/components/question/AnswerField.svelte";
  import MarkDown from "$lib/components/question/MarkDownEditor.svelte";
  import BtnField from "$lib/components/question/QuestionButtonField.svelte";
  import QuestionTextField from "$lib/components/question/QuestionTextField.svelte";

  import type { PageProps } from "./$types";
  let { params }: PageProps = $props();

  let error = $state("");

  let gambiarraCounter = $state(0);

  let title = $state("");
  let subject = $state("");
  let content = $state("");
  let source = $state("");

  let answer_1 = $state("");
  let answer_2 = $state("");
  let answer_3 = $state("");
  let answer_4 = $state("");

  let corret_1 = $state(false);
  let corret_2 = $state(false);
  let corret_3 = $state(false);
  let corret_4 = $state(false);

  let isBlank = $derived(
    title.trim() != "" &&
      subject.trim() != "" &&
      source.trim() != "" &&
      answer_1.trim() != "" &&
      answer_2.trim() != "" &&
      corret_1 == false &&
      corret_2 == false &&
      corret_3 == false &&
      corret_4 == false,
  );

  async function submitChanges() {
    if (!isBlank && content == "") return;
    try {
      await updateQuestion(params.slug, {
        id: params.slug,
        title: title.trim(),
        content: content.trim(),
        source: source.trim(),
        subjects: [subject.trim()],
        answers: [
          { content: answer_1, correct: corret_1, delete: false },
          { content: answer_2, correct: corret_2, delete: false },
          { content: answer_3, correct: corret_3, delete: false },
          { content: answer_4, correct: corret_4, delete: false },
        ],
      });
      await goto(resolve("/questions"));
    } catch (err) {
      if (err instanceof ApiError) {
        switch (err.status) {
          case 400:
            error = "Bad Request";
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
    <div class="flex flex-col justify-center items-center">
      <h1 class="relative inline-block text-4xl font-black leading-none my-4">
        <span class="bg-blue-100"> Editor Questao </span>
      </h1>
      <form class="flex flex-col gap-1.5" onsubmit={submitChanges}>
        {#if gambiarraCounter === 0}
          <QuestionTextField
            placeValue="Insira Novo Titulo"
            title="Titulo Novo"
            bind:bindValue={title}
          />
          <QuestionTextField
            placeValue="Insira outra Materia"
            title="Materias Novas"
            bind:bindValue={subject}
          />
          <QuestionTextField
            placeValue="Insira outra Fonte"
            title="Fonte"
            bind:bindValue={source}
          />
        {:else if gambiarraCounter === 1}
          <MarkDown title="Conteudo" bind:composer_s={content} />
        {:else if gambiarraCounter === 2}
          <AnswerField
            placeValue="Insira Nova Resposta"
            title="Resposta 1"
            bind:bindAnswer={answer_1}
            bind:bindisCorrent={corret_1}
          />
          <AnswerField
            placeValue="Insira Nova Resposta"
            title="Resposta 2"
            bind:bindAnswer={answer_2}
            bind:bindisCorrent={corret_2}
          />

          <AnswerField
            placeValue="Insira Nova Resposta"
            title="Resposta 3"
            bind:bindAnswer={answer_3}
            bind:bindisCorrent={corret_3}
          />

          <AnswerField
            placeValue="Insira Nova Resposta"
            title="Resposta 4"
            bind:bindAnswer={answer_4}
            bind:bindisCorrent={corret_4}
          />
        {/if}
        <BtnField option="Update" bind:counter={gambiarraCounter} />
      </form>
      <ErrorText class="text-center" message={error} />
    </div>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
