<script>
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
    <div class="mb-6">
      <h1 class="relative inline-block text-4xl font-black leading-none">
        <span class="relative z-10"> Faça seu login </span>
        <span
          class="absolute -bottom-0.5 left-[-2.5%] h-3 w-[105%] z-0 -skew-x-6 bg-blue-300"
        >
        </span>
      </h1>
      <p class="mt-1 text-neutral-600">
        Insira seu e-mail e senha para acessar sua conta.
      </p>
    </div>

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

      <button
        type="submit"
        disabled={!isValid}
        class="mt-2 rounded-lg cursor-pointer border-2 border-black px-5 py-3 font-black text-white transition-all enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
      >
        Fazer login
      </button>
    </form>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
