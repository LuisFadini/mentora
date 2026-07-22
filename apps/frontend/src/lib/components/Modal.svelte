<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  import Button from "./Button.svelte";

  type Props = {
    showModal: boolean;
    class?: string;
    children?: Snippet;
    onClose?: () => void;
  };

  let {
    showModal = $bindable(),
    children,
    class: className = "",
    onClose,
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
    `fixed left-1/2 top-1/2 w-[92vw] sm:w-full sm:max-w-lg max-h-[85vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-black bg-white p-4 sm:p-6 shadow-[6px_6px_0_0_black] backdrop:bg-black/30 backdrop:backdrop-blur-[2px]`,
    className,
  )}
  oncancel={handleClose}
  onclick={handleBackdropClick}
  onclose={handleClose}
>
  {@render children?.()}

  <form class="mt-6 flex justify-center" method="dialog">
    <Button class="font-bold px-4 py-2" onclick={handleClose} variant="danger"
      >Fechar</Button
    >
  </form>
</dialog>
