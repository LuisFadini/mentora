<script lang="ts">
  import Icon from "@iconify/svelte";

  import ErrorText from "./ErrorText.svelte";

  type Props = {
    id?: string;
    label: string;
    type?: HTMLInputElement["type"];
    icon?: string;
    placeholder?: string;
    value: string;
    error: string;
    focused?: boolean;
    onValidate?: () => void;
  };

  let propsId = $props.id();

  let {
    id = propsId,
    label,
    type = "text",
    icon,
    placeholder = "",
    value = $bindable(),
    error = $bindable(),
    focused = $bindable(false),
    onValidate,
  }: Props = $props();

  function handleInput() {
    onValidate?.();
  }
</script>

<div class="flex flex-col gap-1.5">
  <label class="font-semibold" for={id}>{label}</label>

  <div
    class="flex items-center gap-2 rounded-lg border-2 border-black bg-white px-3 transition-all focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0_0_black]"
    class:border-green-500={!error && value.trim() !== "" && !focused}
    class:border-red-500={!!error}
  >
    {#if icon}
      <Icon class="text-xl" {icon} />
    {/if}

    <input
      {id}
      class="w-full py-3 outline-none placeholder:text-neutral-400"
      autocomplete="off"
      onblur={() => {
        focused = false;
        onValidate?.();
      }}
      onfocus={() => (focused = true)}
      oninput={handleInput}
      {placeholder}
      {type}
      bind:value
    />
  </div>

  <ErrorText class="text-sm text-start" message={error} />
</div>
