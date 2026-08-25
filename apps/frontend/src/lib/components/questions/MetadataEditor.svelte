<script lang="ts">
  import Icon from "@iconify/svelte";

  import InputField from "../InputField.svelte";

  type Props = {
    title: string;
    titleError: string;

    subject: string;
    subjectError: string;
    subjects: string[];

    source: string;
    sourceError: string;

    validateTitle: () => void;
    handleSubjectKeydown: (event: KeyboardEvent) => void;
    validateSubject: () => void;
    validateSource: () => void;

    remove: (items: string[], index: number) => void;
  };

  let {
    title = $bindable(),
    titleError = $bindable(),
    subject = $bindable(),
    subjectError = $bindable(),
    subjects,
    source = $bindable(),
    sourceError = $bindable(),

    validateTitle,
    handleSubjectKeydown,
    validateSubject,
    validateSource,
    remove,
  }: Props = $props();
</script>

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
