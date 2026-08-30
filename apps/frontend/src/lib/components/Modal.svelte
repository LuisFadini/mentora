<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  import type { ButtonVariant } from "$lib/types";

  import Button from "./Button.svelte";

  type Props = {
    showModal: boolean;
    class?: string;
    children?: Snippet;
    onClose?: () => void;
    closeButtonVariant?: ButtonVariant;
    closeButtonText?: string;
  };

  let {
    showModal = $bindable(),
    children,
    class: className = "",
    onClose,
    closeButtonVariant = "danger",
    closeButtonText = "Fechar",
  }: Props = $props();

  let dialog: HTMLDialogElement;

  let scrollY = 0;

  $effect(() => {
    if (!dialog) return;

    if (showModal) {
      scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    }
  });

  function close() {
    showModal = false;
    onClose?.();
  }

  function handleClose() {
    showModal = false;
    onClose?.();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === dialog) {
      close();
    }
  }
</script>

<dialog
  bind:this={dialog}
  class={twMerge(
    `fixed top-1/2 left-1/2 max-h-[85vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border-2 border-black bg-white p-4 shadow-[6px_6px_0_0_black] backdrop:bg-black/30 backdrop:backdrop-blur-[2px] sm:w-full sm:max-w-lg sm:p-6`,
    className,
  )}
  oncancel={handleClose}
  onclick={handleBackdropClick}
  onclose={handleClose}
>
  {@render children?.()}

  <form class="mt-6 flex justify-center" method="dialog">
    <Button
      class="px-4 py-2 font-bold"
      onclick={handleClose}
      variant={closeButtonVariant}
    >
      {closeButtonText}
    </Button>
  </form>
</dialog>
