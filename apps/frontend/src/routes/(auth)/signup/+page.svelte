<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { createUser } from "$lib/api/users/create-user";
  import AuthFooterLink from "$lib/components/auth/AuthFooterLink.svelte";
  import AuthHeader from "$lib/components/auth/AuthHeader.svelte";
  import AuthSubmitButton from "$lib/components/auth/AuthSubmitButton.svelte";
  import AuthTextField from "$lib/components/auth/AuthTextField.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import * as validators from "$lib/utils/validators";

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");

  let nameError = $state("");
  let emailError = $state("");
  let passwordError = $state("");
  let confirmPasswordError = $state("");

  let nameFocused = $state(false);
  let emailFocused = $state(false);
  let passwordFocused = $state(false);
  let confirmPasswordFocused = $state(false);

  const isValid = $derived(
    name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      !nameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError,
  );

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
    confirmPasswordError = validators.matches(
      confirmPassword,
      password,
      validators.messages.passwordMismatch,
    );
  }

  let loading = $state(false);
  let apiError = $state("");

  async function handleSubmit() {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (!isValid || loading) return;

    loading = true;
    apiError = "";

    try {
      await createUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      await goto(resolve("/login?created=1"));
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            apiError = "Dados inválidos.";
            break;
          case 409:
            apiError = "E-mail já cadastrado.";
            break;
          default:
            apiError = "Erro ao criar conta.";
        }
      } else {
        apiError = "Não foi possível conectar ao servidor.";
      }
    } finally {
      loading = false;
    }
  }
</script>

<main class="flex h-screen w-screen items-center justify-center px-4">
  <div
    class="w-full max-w-md rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_black]"
  >
    <AuthHeader
      header="Crie sua conta"
      subtitle="Insira seus dados para criar sua conta."
    />

    <form class="flex flex-col gap-5" novalidate onsubmit={handleSubmit}>
      <AuthTextField
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

      <AuthTextField
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

      <AuthTextField
        id="password"
        icon="ph:lock-bold"
        label="Senha"
        onValidate={validatePassword}
        placeholder="••••••••"
        type="password"
        bind:value={password}
        bind:error={passwordError}
        bind:focused={passwordFocused}
      />

      <AuthTextField
        id="confirmPassword"
        icon="ph:lock-bold"
        label="Confirme sua senha"
        onValidate={validateConfirmPassword}
        placeholder="••••••••"
        type="password"
        bind:value={confirmPassword}
        bind:error={confirmPasswordError}
        bind:focused={confirmPasswordFocused}
      />

      <AuthSubmitButton disabled={!isValid || loading} type="submit">
        {loading ? "Criando conta..." : "Criar conta"}
      </AuthSubmitButton>

      <ErrorText class="text-center" message={apiError} />

      <AuthFooterLink
        action="Fazer login"
        href="/login"
        text="Já tem uma conta?"
      />
    </form>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
