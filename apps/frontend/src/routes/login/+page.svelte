<script>
  import AuthFooterLink from "$lib/components/auth/AuthFooterLink.svelte";
  import AuthHeader from "$lib/components/auth/AuthHeader.svelte";
  import AuthSubmitButton from "$lib/components/auth/AuthSubmitButton.svelte";
  import AuthTextField from "$lib/components/auth/AuthTextField.svelte";
  import Navbar from "$lib/components/Navbar.svelte";

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

  function validateEmail() {
    const value = email.trim();

    if (!value) {
      emailError = "";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailError = emailRegex.test(value) ? "" : "Digite um e-mail válido.";
  }

  function validatePassword() {
    const value = password.trim();

    if (!value) {
      passwordError = "";
      return;
    }

    passwordError =
      value.length >= 8 ? "" : "A senha deve ter pelo menos 8 caracteres.";
  }

  async function handleSubmit() {
    validateEmail();
    validatePassword();

    if (emailError || passwordError) return;

    alert(`E-mail: ${email}\nSenha: ${password}`);
  }
</script>

<Navbar />

<main class="flex h-screen w-screen items-center justify-center px-4">
  <div
    class="w-full max-w-md rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_black]"
  >
    <AuthHeader
      header="Faça seu login"
      subtitle="Insira seu e-mail e senha para acessar sua conta."
    />

    <form class="flex flex-col gap-5" onsubmit={handleSubmit}>
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

      <AuthSubmitButton disabled={!isValid} type="submit">
        Fazer login
      </AuthSubmitButton>

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
