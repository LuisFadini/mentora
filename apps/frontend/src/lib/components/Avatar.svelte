<script>
  import { twMerge } from "tailwind-merge";

  let { name, avatarUrl, class: className = "" } = $props();

  const fallback = $derived(
    `https://api.dicebear.com/10.x/identicon/svg?seed=${encodeURIComponent(name)}`,
  );
</script>

<img
  class={twMerge(
    "rounded-full border-2 border-black bg-gray-500 object-cover",
    className,
  )}
  src={avatarUrl ?? fallback}
  alt={name}
/>
