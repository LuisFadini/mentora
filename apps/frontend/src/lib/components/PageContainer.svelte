<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  type Props = {
    class?: string;
    children: Snippet;
    as?: "div" | "section" | "article";
  };

  let { class: className = "", children, as = "div" }: Props = $props();
</script>

<svelte:element
  this={as}
  class={twMerge(
    "rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_black]",
    className,
  )}
>
  {@render children()}
</svelte:element>
