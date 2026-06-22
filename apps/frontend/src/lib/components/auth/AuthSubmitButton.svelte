<script>
  let { type, disabled = false, children } = $props();
</script>

<button
  {type}
  {disabled}
  class="mt-2 rounded-lg cursor-pointer border-2 border-black px-5 py-3 font-black text-white transition-all enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
>
  {@render children?.()}
</button>
