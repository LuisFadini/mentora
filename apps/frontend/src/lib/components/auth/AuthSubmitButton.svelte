<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    type?: HTMLButtonElement["type"];
    disabled?: boolean;
    children?: Snippet;
  };

  let { type = "button", disabled = false, children }: Props = $props();
</script>

<button
  class="mt-2 rounded-lg cursor-pointer border-2 border-black px-5 py-3 font-black text-white transition-all enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
  {disabled}
  {type}
>
  {@render children?.()}
</button>
