<script lang="ts">
  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import QuestionMetadata from "./QuestionMetadata.svelte";

  type Props = {
    source: string;
    subjects: string[];
    title: string;
    body: string;
    answers: string[];
    onClose: () => void;
  };

  let { onClose, source, subjects, title, body, answers }: Props = $props();
</script>

<div class="flex flex-col gap-5">
  <QuestionMetadata {onClose} {source} {subjects} {title} />

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
