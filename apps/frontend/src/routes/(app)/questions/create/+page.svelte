<script lang="ts">
  import Icon from "@iconify/svelte";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { createQuestion } from "$lib/api/questions/create-question";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import InputField from "$lib/components/InputField.svelte";
  import PageContainer from "$lib/components/PageContainer.svelte";
  import MarkdownRenderer from "$lib/components/questions/MarkdownRenderer.svelte";
  import MarkdownTextarea from "$lib/components/questions/MarkdownTextarea.svelte";
  import QuestionMetadata from "$lib/components/questions/QuestionMetadata.svelte";
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
      subjects.length &&
      answers.length,
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

  function addToList(
    value: string,
    list: string[],
    validate: () => void,
    clear: () => void,
  ) {
    const item = value.trim();

    if (!item) {
      validate();
      return;
    }

    if (list.some((current) => current.toLowerCase() === item.toLowerCase())) {
      clear();
      return;
    }

    list.push(item);
    clear();
  }

  function addSubject() {
    addToList(subject, subjects, validateSubject, () => {
      subject = "";
      subjectError = "";
    });
  }

  function addAnswer() {
    addToList(answer, answers, validateAnswer, () => {
      answer = "";
      answerError = "";
    });
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

    return (
      !titleError &&
      !sourceError &&
      !bodyError &&
      subjects.length > 0 &&
      answers.length > 0
    );
  }

  function remove(list: string[], index: number) {
    list.splice(index, 1);
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
          default:
            apiError = "Dados de questão inválidos.";
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
        <InputField
          id="titulo"
          icon="ph:text-h-one-bold"
          label="Título"
          onValidate={validateTitle}
          placeholder="Título da questão"
          type="text"
          bind:value={title}
          bind:error={titleError}
        />

        <InputField
          id="materia"
          icon="ph:books-bold"
          label="Matérias"
          onKeydown={handleSubjectKeydown}
          onValidate={validateSubject}
          placeholder="Digite uma matéria e pressione Enter"
          type="text"
          bind:value={subject}
          bind:error={subjectError}
        />

        {#if subjects.length}
          <div class="flex flex-wrap gap-2">
            {#each subjects as item, index (item)}
              <button
                class="group inline-flex cursor-pointer items-center gap-1.5 rounded-sm border-2 border-black bg-blue-300 px-2 py-0.5 text-[11px] font-bold shadow-[2px_2px_0_0_black] transition-all hover:-translate-px hover:bg-blue-400 hover:shadow-[3px_3px_0_0_black]"
                onclick={() => remove(subjects, index)}
                type="button"
              >
                {item}

                <span
                  class="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-black bg-white group-hover:bg-red-400"
                >
                  <Icon class="text-[8px]" icon="ph:x-bold" />
                </span>
              </button>
            {/each}
          </div>
        {/if}

        <InputField
          id="source"
          icon="ph:link-bold"
          label="Fonte"
          onValidate={validateSource}
          placeholder="Enem..."
          type="text"
          bind:value={source}
          bind:error={sourceError}
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

                <label
                  class="min-w-0 flex-1 cursor-pointer"
                  for={`answer-${index}`}
                >
                  <MarkdownRenderer
                    class="text-sm leading-relaxed"
                    markdown={item}
                  />
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
      {:else}
        {#if previewReady}
          <div class="flex flex-col gap-5">
            <QuestionMetadata
              onClose={() => (activeStep = 0)}
              {source}
              {subjects}
              {title}
            />

            <MarkdownRenderer markdown={body} />

            <div class="flex flex-col gap-3">
              {#each answers as item, index (item)}
                <label
                  class="group flex cursor-pointer items-start gap-3 rounded-lg border-2 border-black bg-white px-4 py-4 shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_black] has-checked:translate-x-0.5 has-checked:translate-y-0.5 has-checked:bg-blue-200 has-checked:shadow-none"
                  for={`preview-answer-${index}`}
                >
                  <input
                    id={`preview-answer-${index}`}
                    name="preview-answer"
                    class="mt-1 h-4 w-4 shrink-0 accent-black"
                    type="radio"
                    value={index}
                  />

                  <MarkdownRenderer
                    class="min-w-0 text-sm leading-relaxed"
                    markdown={item}
                  />
                </label>
              {/each}
            </div>
          </div>
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
