<script lang="ts">
  import { twMerge } from "tailwind-merge";

  type Props = {
    message?: string;
    class?: string;
  };

  let { message, class: className = "" }: Props = $props();
</script>

{#if message}
  <p class={twMerge("font-medium text-red-600", className)}>
    {message}
  </p>
{/if}
