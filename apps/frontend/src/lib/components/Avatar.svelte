<script lang="ts">
  import { twMerge } from "tailwind-merge";

  type Props = {
    name: string;
    avatarUrl?: string;
    class?: string;
  };

  let { name, avatarUrl, class: className = "" }: Props = $props();

  const fallback = $derived(
    `https://api.dicebear.com/10.x/identicon/svg?seed=${encodeURIComponent(name)}`,
  );
</script>

<img
  class={twMerge(
    "rounded-full border-2 border-black bg-gray-500 object-cover",
    className,
  )}
  alt={name}
  src={avatarUrl || fallback}
/>
