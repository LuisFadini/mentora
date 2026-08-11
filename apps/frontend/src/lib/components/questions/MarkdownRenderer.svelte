<script lang="ts">
  import { renderMarkdown } from "$lib/render-markdown";

  type Props = {
    markdown: string;
    class?: string;
  };

  let { markdown, class: className = "question-content" }: Props = $props();

  let parsedMarkdown = $state("");

  $effect(() => {
    void (async () => {
      parsedMarkdown = await renderMarkdown(markdown);
    })();
  });
</script>

<div class={className}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html parsedMarkdown}
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .question-content {
    @apply mx-auto mt-6 w-full max-w-prose text-base leading-relaxed text-neutral-800;

    :global(h1) {
      @apply mt-8 mb-4 text-3xl font-black;
    }

    :global(h2) {
      @apply mt-8 mb-3 text-2xl font-extrabold;
    }

    :global(h3) {
      @apply mt-6 mb-2 text-xl font-bold;
    }

    :global(h1:first-child),
    :global(h2:first-child),
    :global(h3:first-child) {
      @apply mt-0;
    }

    :global(strong) {
      @apply font-bold;
    }

    :global(em) {
      @apply italic;
    }

    :global(p) {
      @apply my-4 text-justify;
    }

    :global(ul),
    :global(ol) {
      @apply my-4 ml-6 space-y-2;
    }

    :global(ul) {
      @apply list-disc;
    }

    :global(ol) {
      @apply list-decimal;
    }

    :global(li) {
      @apply pl-1;
    }

    :global(blockquote) {
      @apply my-5 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 px-4 py-3 italic;
    }

    :global(table) {
      @apply my-6 w-full border-collapse overflow-hidden rounded-lg border-2 border-black;
    }

    :global(th) {
      @apply border-2 border-black bg-blue-200 px-4 py-2 text-center font-black;
    }

    :global(td) {
      @apply border-2 border-black px-4 py-2 text-center;
    }

    :global(tbody tr:nth-child(even)) {
      @apply bg-neutral-100;
    }

    :global(code) {
      @apply rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-sm;
    }

    :global(pre) {
      @apply my-5 overflow-x-auto rounded-lg border-2 border-black bg-neutral-900 p-4 text-white;

      :global(code) {
        @apply bg-transparent p-0 text-inherit;
      }
    }

    :global(a) {
      @apply font-semibold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-900;
    }

    :global(hr) {
      @apply my-8 border-black;
    }

    :global(.katex-display) {
      @apply my-6 overflow-x-visible;
    }

    :global(.katex) {
      font-size: 1.05em;
      vertical-align: baseline;
    }
  }
</style>
