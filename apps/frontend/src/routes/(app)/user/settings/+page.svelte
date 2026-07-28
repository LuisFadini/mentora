<script lang="ts">
  import Avatar from "$lib/components/Avatar.svelte";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import TextField from "$lib/components/InputField.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import PageContainer from "$lib/components/PageContainer.svelte";
  import Separator from "$lib/components/Separator.svelte";
  import * as validators from "$lib/utils/validators";

  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { session } = $derived(data);

  let apiError = $state("");

  let name = $state("");
  let email = $state("");
  let avatarUrl = $state("");
  let avatarDraft = $state("");

  let initialized = false;

  $effect(() => {
    if (initialized) return;

    initialized = true;

    name = session.user.name;
    email = session.user.email;

    avatarUrl = session.user.avatarUrl ?? "";
    avatarDraft = avatarUrl;
  });

  let password = $state("");
  let confirmPassword = $state("");

  let nameError = $state("");
  let emailError = $state("");
  let passwordError = $state("");
  let confirmPasswordError = $state("");
  let avatarUrlError = $state("");

  let nameFocused = $state(false);
  let emailFocused = $state(false);
  let passwordFocused = $state(false);
  let confirmPasswordFocused = $state(false);
  let avatarUrlFocused = $state(false);

  const dataChanged = $derived(
    name !== session.user.name ||
      email !== session.user.email ||
      avatarUrl !== (session.user.avatarUrl ?? ""),
  );

  const hasErrors = $derived(
    Boolean(
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      avatarUrlError,
    ),
  );

  let showConfirmAccountDeletionModal = $state(false);
  let showChangeAvatarModal = $state(false);

  function validateName() {
    nameError = validators.minLength(name, 4, validators.messages.nameMin);
  }

  function validateEmail() {
    emailError = validators.email(email);
  }

  function validatePassword() {
    passwordError = validators.minLength(
      password,
      8,
      validators.messages.passwordMin,
    );

    validateConfirmPassword();
  }

  function validateConfirmPassword() {
    confirmPasswordError =
      password !== confirmPassword ? validators.messages.passwordMismatch : "";
  }

  function validateAvatarUrl() {
    avatarUrlError = validators.url(avatarUrl);
  }

  function validateForm() {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    return !(nameError || emailError || passwordError || confirmPasswordError);
  }

  function save() {
    if (!validateForm()) return;
    apiError = "Não implementado";
  }

  function deleteAccount() {
    apiError = "Não implementado";
    showConfirmAccountDeletionModal = false;
  }
</script>

<Modal
  class="sm:w-full sm:max-w-sm"
  closeButtonText="Cancelar"
  closeButtonVariant="primary"
  bind:showModal={showConfirmAccountDeletionModal}
>
  <h1 class="text-3xl font-bold text-center">Deletar conta?</h1>
  <Button class="mx-auto mt-6" onclick={deleteAccount} variant="danger">
    Confirmar
  </Button>
</Modal>

<Modal closeButtonText="Cancelar" bind:showModal={showChangeAvatarModal}>
  <div class="flex flex-col gap-4">
    <Avatar {name} class="mx-auto size-24" avatarUrl={avatarDraft} />

    <TextField
      id="avatar"
      icon="ph:user-bold"
      label="Link da foto de perfil"
      onValidate={validateAvatarUrl}
      placeholder="https://..."
      type="url"
      bind:value={avatarDraft}
      bind:error={avatarUrlError}
      bind:focused={avatarUrlFocused}
    />

    <div class="flex gap-2">
      <Button
        class="flex-1"
        disabled={!avatarDraft && !avatarUrl}
        onclick={() => {
          avatarDraft = "";
          avatarUrlError = "";
        }}
        variant="secondary"
      >
        Remover
      </Button>

      <Button
        class="flex-1"
        onclick={() => {
          validateAvatarUrl();

          if (avatarUrlError) return;

          avatarUrl = avatarDraft;
          showChangeAvatarModal = false;
        }}
      >
        Confirmar
      </Button>
    </div>
  </div>
</Modal>

<main
  class="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center p-4 sm:p-6"
>
  <PageContainer class="w-full max-w-3xl flex flex-col gap-6">
    <h1 class="text-center text-3xl font-bold">Configurações</h1>

    <Separator class="mx-auto w-4/5 bg-blue-400" />

    <div class="flex flex-col-reverse gap-8 lg:flex-row lg:items-start">
      <div class="flex flex-1 flex-col gap-4 w-full max-w-2xl">
        <TextField
          id="name"
          icon="ph:user-bold"
          label="Nome"
          onValidate={validateName}
          placeholder="Seu nome"
          type="text"
          bind:value={name}
          bind:error={nameError}
          bind:focused={nameFocused}
        />

        <TextField
          id="email"
          icon="ph:envelope-simple-bold"
          label="E-mail"
          onValidate={validateEmail}
          placeholder="voce@exemplo.com"
          type="email"
          bind:value={email}
          bind:error={emailError}
          bind:focused={emailFocused}
        />

        <TextField
          id="password"
          icon="ph:lock-bold"
          label="Nova senha"
          onValidate={validatePassword}
          placeholder="••••••••"
          type="password"
          bind:value={password}
          bind:error={passwordError}
          bind:focused={passwordFocused}
        />

        <TextField
          id="confirmPassword"
          icon="ph:lock-bold"
          label="Confirmar nova senha"
          onValidate={validateConfirmPassword}
          placeholder="••••••••"
          type="password"
          bind:value={confirmPassword}
          bind:error={confirmPasswordError}
          bind:focused={confirmPasswordFocused}
        />
      </div>

      <div class="flex flex-row items-center gap-4 mx-auto lg:flex-col">
        <Avatar
          name={name || data.session.user.name}
          class="size-24 sm:size-28 lg:size-32"
          avatarUrl={avatarUrl || data.session.user.avatarUrl}
        />

        <Button
          onclick={() => {
            avatarDraft = avatarUrl;
            avatarUrlError = "";
            showChangeAvatarModal = true;
          }}
          variant="secondary"
        >
          Alterar foto
        </Button>
      </div>
    </div>

    <Separator />

    <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <Button
        class="w-full sm:w-auto"
        onclick={() => {
          showConfirmAccountDeletionModal = true;
        }}
        variant="danger"
      >
        Deletar conta
      </Button>

      <Button
        class="w-full sm:w-auto"
        disabled={!dataChanged || hasErrors}
        onclick={save}
      >
        Salvar alterações
      </Button>
    </div>
    <ErrorText class="text-center" message={apiError} />
  </PageContainer>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
