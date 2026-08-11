<script lang="ts">
  let { option, counter = $bindable() } = $props();
</script>

<div class="flex justify-around gap-3 my-3">
  <div>
    <button
      class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
      disabled={counter === 0}
      onclick={() => counter--}
      type="button"
    >
      Return
    </button>
    <button
      class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
      disabled={counter <= 1}
      type="submit">{option}</button
    >
    <button
      class="mx-1 shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
      disabled={counter === 2}
      onclick={() => counter++}
      type="button"
    >
      Next
    </button>
  </div>
</div>
