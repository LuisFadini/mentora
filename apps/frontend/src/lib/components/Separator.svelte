<script lang="ts">
  import { twMerge } from "tailwind-merge";

  type Orientation = "horizontal" | "vertical";

  type Props = {
    orientation?: Orientation;
    size?: string;
    class?: string;
  };

  const {
    orientation = "horizontal",
    size = "100%",
    class: className,
  }: Props = $props();

  const style = $derived(
    orientation === "horizontal" ? `width: ${size};` : `height: ${size};`,
  );
</script>

<hr
  {style}
  class={twMerge(
    "rounded-xl border-2 border-black bg-blue-500 shadow-[2px_2px_0_0_black]",
    orientation === "horizontal" ? "h-2" : "w-2",
    className,
  )}
/>
