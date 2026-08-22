<script lang="ts">
  import { twMerge } from "tailwind-merge";

  import ErrorText from "../ErrorText.svelte";

  type Props = {
    id?: string;
    label: string;
    placeholder?: string;
    value: string;
    error: string;
    focused?: boolean;
    rows?: number;
    class?: string;
    onValidate?: () => void;
    onKeydown?: (event: KeyboardEvent) => void;
  };

  let propsId = $props.id();

  let {
    id = propsId,
    label,
    placeholder = "",
    value = $bindable(),
    error = $bindable(),
    focused = $bindable(false),
    rows = 6,
    class: className,
    onValidate,
    onKeydown,
  }: Props = $props();
</script>

<div class="flex flex-col gap-1.5">
  <label class="font-semibold" for={id}>
    {label}
    <span class="font-normal text-neutral-500">(suporta Markdown)</span>
  </label>

  <textarea
    {id}
    class={twMerge(
      "min-h-32 flex-1 resize-none rounded-lg border-2 border-black bg-white px-2 py-2 outline-none transition-all focus:-translate-x-1 focus:-translate-y-1 focus:shadow-[6px_6px_0_0_black]",
      className,
    )}
    class:border-green-500={!error && value.trim() !== "" && !focused}
    class:border-red-500={!!error}
    autocomplete="off"
    onblur={() => {
      focused = false;
      onValidate?.();
    }}
    onfocus={() => (focused = true)}
    onkeydown={onKeydown}
    {placeholder}
    {rows}
    bind:value></textarea>

  <ErrorText class="text-sm" message={error} />
</div>
