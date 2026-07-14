<script lang="ts">
  import { createQuestion } from "$lib/api/questions/create-question";
  import { ApiError } from "$lib/api/api-error";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  let questionTitle = $state("");
  let questionEnunciado = $state("");
  let questionSubjects_1 = $state("");
  let questionSubjects_2 = $state("");
  let questionSource = $state("");
  let questionAnswer_1 = $state("");
  let questionAnswer_2 = $state("");
  const questaoValida = $derived(
    questionTitle.trim() != "" &&
      questionSource.trim() != "" &&
      questionEnunciado.trim() != "" &&
      questionSubjects_1.trim() != "" &&
      questionSubjects_2.trim() != "" &&
      questionAnswer_1.trim() != "" &&
      questionAnswer_2.trim() != "",
  );

  let error = $state("");
  //TODO: Tratamento de error

  async function submitQuestion() {
    if (!questaoValida) return;
    error = "";
    try {
      await createQuestion({
        title: questionTitle.trim(),
        content: questionEnunciado.trim(),
        source: questionSource.trim(),
        subjects: [questionSubjects_1.trim(), questionSubjects_2.trim()],
        answers: [
          { correct: true, content: questionAnswer_1.trim() },
          { correct: false, content: questionAnswer_2.trim() },
        ],
      });
      goto(resolve("/questions"));
    } catch (err) {
      // Nota Pessoal : Iremos Ver se o error tem haver com a api -> se tem o constructor do ApiError
      if (err instanceof ApiError) {
        switch (err) {
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
    class="flex w-full max-w-2xl flex-col gap-2 rounded-xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_black] sm:p-6"
  >
    <div>{error}</div>
    <form
      onsubmit={submitQuestion}
      class="flex flex-col justify-center items-center gap-2.5"
    >
      <label>
        Titulo
        <input
          bind:value={questionTitle}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <label>
        Enunciado
        <input
          bind:value={questionEnunciado}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <label>
        Vestibular:
        <input
          bind:value={questionSource}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <label>
        Materia_1
        <input
          bind:value={questionSubjects_1}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <label>
        Materia_2
        <input
          bind:value={questionSubjects_2}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <label>
        Resposta 1:
        <input
          bind:value={questionAnswer_1}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <label>
        Resposta 2:
        <input
          bind:value={questionAnswer_2}
          class="rounded-xl border-2 border-black shadow-[4px_4px_0_0_black]"
        />
      </label>

      <button
        type="submit"
        class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
        >Create</button
      >
    </form>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
