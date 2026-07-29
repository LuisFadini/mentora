<script lang="ts">
  let {
    title,
    placeValue,

    bindAnswer = $bindable(),
    bindisCorrent = $bindable(),
  } = $props();
</script>

<div class="flex flex-col gap-1.5">
  <label for={title}>{title}</label>

  <div
    class="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 transition-all focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_0_black]"
  >
    <input type="checkbox" bind:checked={bindisCorrent} />
    <input
      bind:value={bindAnswer}
      placeholder={placeValue}
      class="w-full py-3 outline-none placeholder:text-neutral-400"
    />
  </div>
</div>
