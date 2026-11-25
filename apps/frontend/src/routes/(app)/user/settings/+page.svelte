<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { deleteUser } from "$lib/api/users/delete-user";
  import { updateUser, type UpdateUserDTO } from "$lib/api/users/update-user";
  import AvatarPicker from "$lib/components/AvatarPicker.svelte";
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
  let loading = $state(false);

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");

  let avatarUrl = $state("");

  let initialized = false;

  $effect(() => {
    if (initialized) return;

    initialized = true;

    name = session.user.name;
    email = session.user.email;
    avatarUrl = session.user.avatarUrl ?? "";
  });

  let nameError = $state("");
  let emailError = $state("");
  let passwordError = $state("");
  let confirmPasswordError = $state("");

  let nameFocused = $state(false);
  let emailFocused = $state(false);
  let passwordFocused = $state(false);
  let confirmPasswordFocused = $state(false);

  const originalAvatarUrl = $derived(session.user.avatarUrl ?? "");

  const dataChanged = $derived(
    name.trim() !== session.user.name ||
      email.trim() !== session.user.email ||
      avatarUrl !== originalAvatarUrl ||
      password.trim() !== "",
  );

  const hasErrors = $derived(
    Boolean(nameError || emailError || passwordError || confirmPasswordError),
  );

  let showConfirmAccountDeletionModal = $state(false);

  function validateName() {
    nameError = validators.minLength(
      name.trim(),
      4,
      validators.messages.nameMin,
    );
  }

  function validateEmail() {
    emailError = validators.email(email.trim());
  }

  function validatePassword() {
    if (!password.trim()) {
      passwordError = "";
      confirmPasswordError = "";
      return;
    }

    passwordError = validators.minLength(
      password.trim(),
      8,
      validators.messages.passwordMin,
    );

    validateConfirmPassword();
  }

  function validateConfirmPassword() {
    if (!password.trim() && !confirmPassword.trim()) {
      confirmPasswordError = "";
      return;
    }

    confirmPasswordError =
      password !== confirmPassword ? validators.messages.passwordMismatch : "";
  }

  function validateForm() {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    return !(nameError || emailError || passwordError || confirmPasswordError);
  }

  function getUpdateData(): UpdateUserDTO {
    const data: UpdateUserDTO = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedName !== session.user.name) {
      data.name = trimmedName;
    }

    if (trimmedEmail !== session.user.email) {
      data.email = trimmedEmail;
    }

    if (trimmedPassword) {
      data.password = trimmedPassword;
    }

    if (avatarUrl !== originalAvatarUrl) {
      data.avatar = avatarUrl || null;
    }

    return data;
  }

  async function save() {
    apiError = "";

    if (!validateForm()) return;

    const updateData = getUpdateData();

    if (Object.keys(updateData).length === 0) return;

    loading = true;

    try {
      await updateUser(session.user.id, updateData);

      window.location.reload();
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            apiError = "Dados inválidos.";
            break;

          case 404:
            apiError = "Usuário não encontrado.";
            break;

          case 409:
            apiError = "Este e-mail já está sendo usado.";
            break;

          default:
            apiError = "Erro ao atualizar os dados.";
        }
      } else {
        apiError = "Não foi possível conectar ao servidor.";
      }
    } finally {
      loading = false;
    }
  }

  async function deleteAccount() {
    apiError = "";
    showConfirmAccountDeletionModal = false;
    loading = true;

    try {
      await deleteUser(session.user.id);

      await goto(resolve("/"), {
        invalidateAll: true,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 404:
            apiError = "Usuário não encontrado.";
            break;

          default:
            apiError = "Erro ao deletar usuário.";
        }
      } else {
        apiError = "Não foi possível conectar ao servidor.";
      }
    } finally {
      loading = false;
    }
  }
</script>

<Modal
  class="sm:w-full sm:max-w-sm"
  closeButtonText="Cancelar"
  closeButtonVariant="primary"
  bind:showModal={showConfirmAccountDeletionModal}
>
  <h1 class="text-center text-3xl font-bold">Deletar conta?</h1>

  <Button
    class="mx-auto mt-6 font-bold"
    onclick={deleteAccount}
    variant="danger"
  >
    Confirmar
  </Button>
</Modal>

<main
  class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 pt-16 sm:p-6"
>
  <PageContainer class="flex w-full max-w-3xl flex-col gap-6">
    <h1 class="text-center text-3xl font-bold">Configurações</h1>

    <Separator class="mx-auto w-4/5 bg-blue-400" />

    <div class="flex flex-col-reverse gap-8 lg:flex-row lg:items-start">
      <div class="flex w-full max-w-2xl flex-1 flex-col gap-4">
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

      <AvatarPicker name={name || session.user.name} bind:avatarUrl />
    </div>

    <Separator />

    <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <Button
        class="w-full font-medium sm:w-auto"
        disabled={loading}
        onclick={() => {
          showConfirmAccountDeletionModal = true;
        }}
        variant="danger"
      >
        Deletar conta
      </Button>

      <Button
        class="w-full font-bold sm:w-auto"
        disabled={!dataChanged || hasErrors || loading}
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
