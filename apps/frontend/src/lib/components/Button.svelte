<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type ButtonVariant = "primary" | "secondary" | "danger";
  type ShadowVariant = "sm" | "base" | "lg" | "xl";

  type Props = HTMLButtonAttributes & {
    children?: Snippet;
    icon?: string;

    iconPosition?: "left" | "right";
    variant?: ButtonVariant;
    shadowVariant?: ShadowVariant;

    class?: string;
    iconClass?: string;
  };

  const {
    children,
    icon,
    iconClass,
    iconPosition,
    variant = "primary",
    shadowVariant = "base",
    type = "button",
    class: className,
    ...rest
  }: Props = $props();

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-500 text-white disabled:bg-blue-200 disabled:text-neutral-500",
    secondary: "bg-yellow-300 disabled:bg-yellow-200 disabled:text-neutral-700",
    danger:
      "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-400 disabled:text-neutral-600",
  };

  const shadowSizes: Record<ShadowVariant, string> = {
    sm: "2px",
    base: "4px",
    lg: "6px",
    xl: "8px",
  };

  const shadowSize = $derived(shadowSizes[shadowVariant ?? "base"]);

  const shadowStyle = $derived(`--button-shadow-size: ${shadowSize};`);

  const iconOnly = $derived(!!icon && !children);
</script>

<button
  style={shadowStyle}
  class={twMerge(
    "cursor-pointer disabled:cursor-not-allowed flex items-center justify-center rounded-lg border-2 border-black transition-all",
    "enabled:shadow-[var(--button-shadow-size)_var(--button-shadow-size)_0_0_black] enabled:hover:translate-(--button-shadow-size) enabled:hover:shadow-none",
    iconOnly ? "aspect-square p-3" : "gap-2 px-6 py-3",
    variantClasses[variant],
    className,
  )}
  {type}
  {...rest}
>
  {#if icon && iconPosition !== "right"}
    <Icon class={iconClass} {icon} />
  {/if}

  {@render children?.()}

  {#if icon && iconPosition === "right"}
    <Icon class={iconClass} {icon} />
  {/if}
</button>
