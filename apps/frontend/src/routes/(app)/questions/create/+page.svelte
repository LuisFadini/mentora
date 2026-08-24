<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { createQuestion } from "$lib/api/questions/create-question";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import PageContainer from "$lib/components/PageContainer.svelte";
  import AnswerEditor from "$lib/components/questions/AnswerEditor.svelte";
  import MarkdownTextarea from "$lib/components/questions/MarkdownTextarea.svelte";
  import MetadataEditor from "$lib/components/questions/MetadataEditor.svelte";
  import PreviewRenderer from "$lib/components/questions/PreviewRenderer.svelte";
  import Stepper from "$lib/components/questions/Stepper.svelte";
  import Separator from "$lib/components/Separator.svelte";
  import * as validators from "$lib/utils/validators";

  const steps = ["Metadados", "Questão", "Respostas", "Preview"];

  let activeStep = $state(0);

  let title = $state("");
  let subject = $state("");
  let source = $state("");
  let body = $state("");
  let answer = $state("");
  let correctAnswer = $state<number | null>(null);

  const subjects = $state<string[]>([]);
  const answers = $state<string[]>([]);

  let titleError = $state("");
  let subjectError = $state("");
  let sourceError = $state("");
  let bodyError = $state("");
  let answerError = $state("");

  let loading = $state(false);
  let apiError = $state("");

  const previewReady = $derived(
    Boolean(
      title.trim() &&
      source.trim() &&
      body.trim() &&
      subjects.length > 0 &&
      answers.length > 0 &&
      correctAnswer !== null,
    ),
  );

  function validateTitle() {
    titleError = validators.minLength(title, 8, validators.messages.titleMin);
  }

  function validateSubject() {
    subjectError = validators.minLength(
      subject,
      4,
      validators.messages.subjectMin,
    );
  }

  function validateSource() {
    sourceError = validators.minLength(
      source,
      4,
      validators.messages.sourceMin,
    );
  }

  function validateBody() {
    bodyError = validators.minLength(body, 1, validators.messages.bodyRequired);
  }

  function validateAnswer() {
    answerError = validators.minLength(
      answer,
      1,
      validators.messages.answerRequired,
    );
  }

  function addToList(value: string, list: string[]) {
    const item = value.trim();

    if (!item) return;

    if (list.some((current) => current.toLowerCase() === item.toLowerCase())) {
      return;
    }

    list.push(item);
  }

  function addSubject() {
    const value = subject.trim();

    if (!value) {
      validateSubject();
      return;
    }

    addToList(value, subjects);

    subject = "";
    subjectError = "";
  }

  function addAnswer() {
    const value = answer.trim();

    if (!value) {
      validateAnswer();
      return;
    }

    addToList(value, answers);

    answer = "";
    answerError = "";
  }

  function handleSubjectKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    addSubject();
  }

  function handleAnswerKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter" || !(event.ctrlKey || event.metaKey)) return;

    event.preventDefault();
    addAnswer();
  }

  function validateForm() {
    validateTitle();
    validateSource();
    validateBody();

    if (subjects.length === 0) {
      subjectError = validators.messages.subjectMin;
    }

    if (answer.trim()) {
      validateAnswer();
    }

    return (
      !titleError &&
      !sourceError &&
      !bodyError &&
      !answerError &&
      subjects.length > 0 &&
      answers.length > 0 &&
      correctAnswer !== null
    );
  }

  function remove(list: string[], index: number) {
    list.splice(index, 1);
  }

  function removeAnswer(_: string[], index: number) {
    answers.splice(index, 1);

    if (correctAnswer === index) {
      correctAnswer = null;
    } else if (correctAnswer !== null && correctAnswer > index) {
      correctAnswer -= 1;
    }
  }

  async function submit() {
    if (!validateForm() || loading) return;

    loading = true;

    try {
      await createQuestion({
        title: title.trim(),
        source: source.trim(),
        subjects: subjects.map((subject) => subject.trim()),
        content: body.trim(),
        answers: answers.map((answer, i) => ({
          content: answer.trim(),
          correct: i === correctAnswer,
        })),
      });
      await goto(resolve("/(app)/questions"));
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            apiError = "Dados de questão inválidos.";
            break;

          case 403:
            apiError = "Você não tem permissão para criar questão.";
            break;

          default:
            apiError = "Não foi possível criar a questão.";
        }
      } else {
        apiError = "Não foi possível conectar ao servidor.";
      }
    } finally {
      loading = false;
    }
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

<main
  class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 pt-16"
>
  <PageContainer class="flex w-full max-w-3xl flex-col p-4 sm:p-6" as="section">
    <Stepper canChange={!loading} {steps} bind:activeStep />

    <Separator
      class="mx-auto my-2 max-w-4/5 bg-blue-400"
      orientation="horizontal"
    />

    <div class="flex min-h-70 flex-col gap-3">
      {#if activeStep === 0}
        <MetadataEditor
          {handleSubjectKeydown}
          {remove}
          {subjects}
          {validateSource}
          {validateSubject}
          {validateTitle}
          bind:title
          bind:titleError
          bind:subject
          bind:subjectError
          bind:source
          bind:sourceError
        />
      {:else if activeStep === 1}
        <MarkdownTextarea
          id="body"
          class="min-h-60"
          label="Corpo da questão"
          onValidate={validateBody}
          placeholder="Escreva a questão..."
          bind:value={body}
          bind:error={bodyError}
        />
      {:else if activeStep === 2}
        <AnswerEditor
          {answers}
          {handleAnswerKeydown}
          remove={removeAnswer}
          {validateAnswer}
          bind:answer
          bind:answerError
          bind:correctAnswer
        />
      {:else}
        {#if previewReady}
          <PreviewRenderer
            {answers}
            {body}
            onClose={() => (activeStep = 0)}
            {source}
            {subjects}
            {title}
          />
        {:else}
          <div class="m-auto flex h-full items-center justify-center">
            <h1 class="text-3xl font-bold">Nada a ser visto ainda</h1>
          </div>
        {/if}
      {/if}
    </div>

    <div class="mt-6 flex justify-between gap-4">
      {#if activeStep > 0}
        <Button
          class="h-12 px-4 font-bold"
          disabled={loading}
          icon="ph:arrow-left-bold"
          iconClass="text-xl"
          iconPosition="left"
          onclick={() => activeStep--}
          type="button"
        >
          {steps[activeStep - 1]}
        </Button>
      {:else}
        <div></div>
      {/if}

      <Button
        class="h-12 px-4 font-bold"
        disabled={loading ||
          (activeStep === steps.length - 1 &&
            (!previewReady || correctAnswer === null))}
        icon="ph:arrow-right-bold"
        iconClass="text-xl"
        iconPosition="right"
        onclick={() =>
          activeStep === steps.length - 1 ? submit() : activeStep++}
        type="button"
        variant={activeStep === steps.length - 1 ? "secondary" : "primary"}
      >
        {#if activeStep === steps.length - 1}
          {#if loading}
            Criando...
          {:else}
            Concluir
          {/if}
        {:else}
          {steps[activeStep + 1]}
        {/if}
      </Button>
    </div>

    <ErrorText class="text-center" message={apiError} />
  </PageContainer>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
