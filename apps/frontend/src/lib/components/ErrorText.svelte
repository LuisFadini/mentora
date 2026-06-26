<script>
  import { twMerge } from "tailwind-merge";

  let { message, class: className = "" } = $props();
</script>

{#if message}
  <p class={twMerge("font-medium text-red-600", className)}>
    {message}
  </p>
{/if}
