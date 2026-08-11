<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { createQuestion } from "$lib/api/questions/create-question";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import AnswerField from "$lib/components/question/AnswerField.svelte";
  import MarkDown from "$lib/components/question/MarkDownEditor.svelte";
  import ButtonSection from "$lib/components/question/QuestionButtonField.svelte";
  import QuestionTextField from "$lib/components/question/QuestionTextField.svelte";

  let sectionCounter = $state(0);
  let questionTitle = $state("");
  let questionEnunciado = $state("");
  let questionSubjects_1 = $state("");
  let questionSource = $state("");

  let questionAnswer_1 = $state("");
  let questionAnswer_2 = $state("");
  let questionAnswer_3 = $state("");
  let questionAnswer_4 = $state("");

  let isCorrect_1 = $state(false);
  let isCorrect_2 = $state(false);
  let isCorrect_3 = $state(false);
  let isCorrect_4 = $state(false);
  const questaoValida = $derived(
    questionTitle.trim() != "" &&
      questionSource.trim() != "" &&
      questionSubjects_1.trim() != "" &&
      questionAnswer_1.trim() != "" &&
      questionAnswer_2.trim() != "",
  );

  let error = $state("");
  //TODO: Tratamento de error

  async function submitQuestion() {
    /* const editor = editorComposer.getEditor();
    editor.read(() => {
      questionEnunciado = convertToMarkdownString(ALL_TRANSFORMERS);
      //questionEnunciado
    }); */
    if (!questaoValida && questionEnunciado == "") return;
    error = "";
    try {
      await createQuestion({
        title: questionTitle.trim(),
        content: questionEnunciado.trim(),
        source: questionSource.trim(),
        subjects: [questionSubjects_1.trim()],
        answers: [
          { correct: isCorrect_1, content: questionAnswer_1.trim() },
          { correct: isCorrect_2, content: questionAnswer_2.trim() },
          { correct: isCorrect_3, content: questionAnswer_3.trim() },
          { correct: isCorrect_4, content: questionAnswer_4.trim() },
        ],
      });
      await goto(resolve("/questions"));
    } catch (err) {
      // Nota Pessoal : Iremos Ver se o error tem haver com a api -> se tem o constructor do ApiError
      if (err instanceof ApiError) {
        switch (err.status) {
          case 400:
            error = "Bad Request";
            break;
          default:
            error = "Error ao criar Questao";
            break;
        }
      } else {
        error = "Error Na Conexao com o Servidor";
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

      <form
        class="flex flex-col justify-center items-center gap-2.5"
        onsubmit={submitQuestion}
      >
        {#if sectionCounter === 0}
          <QuestionTextField
            placeValue="Titulo"
            title="Titulo"
            bind:bindValue={questionTitle}
          />

          <QuestionTextField
            placeValue="Materia"
            title="Materia"
            bind:bindValue={questionSubjects_1}
          />

          <QuestionTextField
            placeValue="Vestibular"
            title="Fonte"
            bind:bindValue={questionSource}
          />
        {:else if sectionCounter === 1}
          <MarkDown title="Enunciado" bind:composer_s={questionEnunciado} />
          <!-- <ContentField title="Conteudo" bind:composer={editorComposer} /> -->
        {:else if sectionCounter === 2}
          <AnswerField
            placeValue="Digite Resposta"
            title="Resposta 1"
            bind:bindAnswer={questionAnswer_1}
            bind:bindisCorrent={isCorrect_1}
          />

          <AnswerField
            placeValue="Digite Resposta"
            title="Resposta 2"
            bind:bindAnswer={questionAnswer_2}
            bind:bindisCorrent={isCorrect_2}
          />

          <AnswerField
            placeValue="Digite Resposta"
            title="Resposta 3"
            bind:bindAnswer={questionAnswer_3}
            bind:bindisCorrent={isCorrect_3}
          />

          <AnswerField
            placeValue="Digite Resposta"
            title="Resposta 4"
            bind:bindAnswer={questionAnswer_4}
            bind:bindisCorrent={isCorrect_4}
          />
        {/if}
        <ButtonSection option="Create" bind:counter={sectionCounter} />
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
