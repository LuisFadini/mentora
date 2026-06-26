<script>
  import Icon from "@iconify/svelte";
  import ErrorText from "../ErrorText.svelte";

  let {
    id,
    label,
    type = "text",
    icon,
    placeholder = "",
    value = $bindable(),
    error = $bindable(),
    focused = $bindable(false),
    onValidate,
  } = $props();

  function handleInput() {
    onValidate?.();
  }
</script>

<div class="flex flex-col gap-1.5">
  <label for={id} class="font-semibold">{label}</label>

  <div
    class:border-red-500={!!error}
    class:border-green-500={!error && value.trim() !== "" && !focused}
    class="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 transition-all focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_0_black]"
  >
    {#if icon}
      <Icon {icon} class="text-xl" />
    {/if}

    <input
      {id}
      {type}
      bind:value
      {placeholder}
      autocomplete="off"
      onfocus={() => (focused = true)}
      onblur={() => {
        focused = false;
        onValidate?.();
      }}
      oninput={handleInput}
      class="w-full py-3 outline-none placeholder:text-neutral-400"
    />
  </div>

  <ErrorText class="text-sm text-start" message={error} />
</div>
