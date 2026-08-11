<script lang="ts">
  let { title, bindValue = $bindable(), placeValue } = $props();
</script>

<div class="flex flex-col gap-1.5">
  <label
    class="relative inline-block text-2xl font-black leading-none my-1"
    for={title}>{title}</label
  >

  <div
    class="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 transition-all focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_0_black]"
  >
    <input
      class="w-full py-3 outline-none placeholder:text-neutral-400"
      placeholder={placeValue}
      bind:value={bindValue}
    />
  </div>
</div>
