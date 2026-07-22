<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { closeSession } from "$lib/api/users/close-session";
  import Avatar from "$lib/components/Avatar.svelte";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";

  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const hours = new Date().getHours();

  let logoutError = $state("");

  async function logout() {
    try {
      const success = await closeSession(fetch);

      if (success)
        await goto(resolve("/"), {
          invalidateAll: true,
        });
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            logoutError = "Erro";
            break;
        }
      } else {
        logoutError = "Não foi possível conectar ao servidor.";
      }
    }
  }
</script>

<main class="h-screen w-screen flex flex-col gap-2 justify-center items-center">
  {#if data.session && data.session.authenticated}
    {const user = data.session.user}
    <div
      class="w-full max-w-sm sm:max-w-lg lg:max-w-xl rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_black]"
    >
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <h2 class="text-3xl font-bold">
            {#if hours < 6 || hours >= 18}
              Boa noite
            {:else if hours < 12}
              Bom dia
            {:else}
              Boa tarde
            {/if},
          </h2>

          <h1
            class="relative inline-block w-fit text-4xl font-black leading-none"
          >
            <span class="relative z-10">{user.name}!</span>
            <span
              class="absolute -bottom-0.5 left-[-2.5%] h-3 w-[110%] z-0 -skew-x-6 bg-blue-300"
            ></span>
          </h1>
        </div>

        <Avatar name={user.name} class="size-36" avatarUrl={user.avatarUrl} />
      </div>

      <Button
        class="font-bold mt-2"
        icon="ph:sign-out-bold"
        iconPosition="right"
        onclick={logout}
        shadowVariant="base"
        variant="danger"
      >
        Sair
      </Button>

      <ErrorText class="text-center" message={logoutError} />
    </div>
  {:else}
    <h1 class="text-center text-5xl font-semibold text-gray-800">
      “Seu caminho até a aprovação <span
        class="bg-blue-400/60 -m-1 p-1 rounded-md border-2 border-zinc-500/50 text-nowrap"
      >
        começa aqui
      </span>”
    </h1>
    <h2 class="text-center text-2xl">
      Resolva, revise e acompanhe seu desempenho em um só lugar.
    </h2>
  {/if}
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
