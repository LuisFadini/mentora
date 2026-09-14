<script lang="ts">
  import { twMerge } from "tailwind-merge";

  import { API_URL } from "$lib/api/client";

  type Props = {
    name: string;
    avatarUrl?: string;
    class?: string;
  };

  let { name, avatarUrl, class: className = "" }: Props = $props();

  const fallback = $derived(
    `https://api.dicebear.com/10.x/identicon/svg?seed=${encodeURIComponent(name)}`,
  );

  const src = $derived(
    avatarUrl
      ? avatarUrl.startsWith("data:image/")
        ? avatarUrl
        : `${API_URL}${avatarUrl}`
      : fallback,
  );
</script>

<img
  class={twMerge(
    "rounded-full border-2 border-black bg-gray-500 object-cover",
    className,
  )}
  alt={name}
  {src}
/>
