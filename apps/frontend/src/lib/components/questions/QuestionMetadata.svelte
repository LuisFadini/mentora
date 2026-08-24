<script lang="ts">
  import Button from "../Button.svelte";

  type Props = {
    title: string;
    subjects: string[];
    source: string;
    onClose?: () => void;
  };

  const { title, subjects, source, onClose }: Props = $props();
</script>

<div class="flex flex-col gap-5">
  <div class="flex items-start justify-between gap-4">
    <h1 class="text-3xl font-black leading-none sm:text-4xl">
      {title}
    </h1>

    <Button
      class="size-9 shrink-0 p-0"
      icon="ph:x-bold"
      onclick={() => onClose?.()}
      shadowVariant="sm"
      type="button"
      variant="danger"
    />
  </div>

  <div class="flex flex-wrap items-center gap-2">
    {#each subjects as item (item)}
      <span
        class="rounded-sm border-2 border-black bg-blue-300 px-2 py-0.5 text-[11px] font-bold shadow-[2px_2px_0_0_black]"
      >
        {item}
      </span>
    {/each}

    <span class="text-xs text-neutral-600">
      Fonte: {source}
    </span>
  </div>
</div>
