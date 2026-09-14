<script lang="ts">
  import Cropper, { type OnCropCompleteEvent } from "svelte-easy-crop";

  import Avatar from "$lib/components/Avatar.svelte";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { cropImage, type PixelCrop } from "$lib/utils/crop-image";

  type Props = {
    name: string;
    avatarUrl?: string;
  };

  let { name, avatarUrl = $bindable("") }: Props = $props();

  let showModal = $state(false);
  let input = $state<HTMLInputElement>();

  let image = $state("");
  let crop = $state({ x: 0, y: 0 });
  let zoom = $state(1);
  let pixelCrop = $state<PixelCrop | null>(null);
  let error = $state("");
  let processing = $state(false);

  function open() {
    image = "";
    crop = { x: 0, y: 0 };
    zoom = 1;
    pixelCrop = null;
    error = "";
    showModal = true;
  }

  function selectImage(event: Event) {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      error = "Selecione uma imagem válida.";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;

      image = reader.result;
      crop = { x: 0, y: 0 };
      zoom = 1;
      pixelCrop = null;
      error = "";
    };

    reader.readAsDataURL(file);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.currentTarget instanceof HTMLInputElement &&
      (event.currentTarget.value = "");
  }

  async function confirm() {
    if (!image || !pixelCrop) return;

    processing = true;
    error = "";

    try {
      const file = await cropImage(image, pixelCrop, 500);
      avatarUrl = await fileToDataUrl(file);

      showModal = false;
      image = "";
      pixelCrop = null;
    } catch {
      error = "Não foi possível processar a imagem.";
    } finally {
      processing = false;
    }
  }

  function resetCrop() {
    image = "";
    pixelCrop = null;
    crop = { x: 0, y: 0 };
    zoom = 1;
  }

  function remove() {
    avatarUrl = "";
    showModal = false;
  }

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Invalid file result"));
        }
      };

      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
</script>

<div class="flex flex-row items-center gap-4 lg:flex-col">
  <Avatar
    {name}
    class="size-24 sm:size-28 lg:size-32"
    avatarUrl={avatarUrl || undefined}
  />

  <Button class="font-medium" onclick={open} variant="secondary">
    Alterar foto
  </Button>
</div>

<Modal closeButtonText="Cancelar" bind:showModal>
  <div class="flex flex-col gap-4">
    {#if image}
      <div
        class="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg"
      >
        <Cropper
          aspect={1}
          cropShape="rect"
          cropSize={{ width: 500, height: 500 }}
          {image}
          oncropcomplete={(event: OnCropCompleteEvent) =>
            (pixelCrop = event.pixels)}
          showGrid={true}
          bind:crop
          bind:zoom
        />
      </div>

      <input
        class="w-full"
        max="3"
        min="1"
        step="0.01"
        type="range"
        bind:value={zoom}
      />

      <ErrorText message={error} />
    {:else}
      <Avatar
        {name}
        class="mx-auto size-24"
        avatarUrl={avatarUrl || undefined}
      />

      <input
        bind:this={input}
        class="hidden"
        accept="image/jpeg,image/png,image/webp"
        onchange={selectImage}
        type="file"
      />

      <Button
        class="w-full font-semibold"
        onclick={() => input?.click()}
        variant="secondary"
      >
        Escolher foto
      </Button>
    {/if}

    <div class="flex gap-2">
      <Button
        class="flex-1 font-semibold"
        disabled={processing}
        onclick={image ? resetCrop : remove}
        variant="secondary"
      >
        {image ? "Escolher outra" : "Remover"}
      </Button>

      <Button
        class="flex-1 font-semibold"
        disabled={!pixelCrop || processing}
        onclick={confirm}
      >
        {processing ? "Processando..." : "Confirmar"}
      </Button>
    </div>
  </div>
</Modal>
