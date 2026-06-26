<script>
  import * as validators from "$lib/utils/validators";
  import AuthFooterLink from "$lib/components/auth/AuthFooterLink.svelte";
  import AuthHeader from "$lib/components/auth/AuthHeader.svelte";
  import AuthSubmitButton from "$lib/components/auth/AuthSubmitButton.svelte";
  import AuthTextField from "$lib/components/auth/AuthTextField.svelte";
  import { ApiError } from "$lib/api/api-error";
  import { createSession } from "$lib/api/users/create-session";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let email = $state("");
  let password = $state("");

  let emailError = $state("");
  let passwordError = $state("");

  let emailFocused = $state(false);
  let passwordFocused = $state(false);

  const isValid = $derived(
    email.trim() !== "" &&
      password.trim() !== "" &&
      !emailError &&
      !passwordError,
  );

  const accountCreated = $derived(
    page.url.searchParams.has("created") && email === "" && password === "",
  );

  function validateEmail() {
    emailError = validators.email(email);
  }

  function validatePassword() {
    passwordError = validators.minLength(
      password,
      8,
      validators.messages.passwordMin,
    );
  }

  let loading = $state(false);
  let apiError = $state("");

  async function handleSubmit() {
    validateEmail();
    validatePassword();

    if (!isValid || loading) return;

    loading = true;
    apiError = "";

    try {
      await createSession({ email: email.trim(), password });
      goto(resolve("/"), { invalidateAll: true });
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 401:
          case 404:
            apiError = "E-mail ou senha inválidos.";
            break;
          default:
            apiError = "Erro ao fazer login.";
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
      header="Faça seu login"
      subtitle="Insira seu e-mail e senha para acessar sua conta."
    />

    <form class="flex flex-col gap-5" novalidate onsubmit={handleSubmit}>
      <AuthTextField
        id="email"
        label="E-mail"
        type="email"
        icon="mdi:email-outline"
        placeholder="voce@exemplo.com"
        bind:value={email}
        bind:error={emailError}
        bind:focused={emailFocused}
        onValidate={validateEmail}
      />

      <AuthTextField
        id="password"
        label="Senha"
        type="password"
        icon="mdi:lock-outline"
        placeholder="••••••••"
        bind:value={password}
        bind:error={passwordError}
        bind:focused={passwordFocused}
        onValidate={validatePassword}
      />

      <AuthSubmitButton disabled={!isValid || loading} type="submit">
        {loading ? "Fazendo login..." : "Fazer login"}
      </AuthSubmitButton>

      {#if accountCreated}
        <p class="text-center font-medium text-green-600">
          Conta criada com sucesso! Faça login para continuar.
        </p>
      {/if}

      <ErrorText message={apiError} class="text-center" />

      <AuthFooterLink
        text="Não tem uma conta?"
        href="/signup"
        action="Criar conta"
      />
    </form>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
