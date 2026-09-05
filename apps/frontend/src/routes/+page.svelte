<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { ApiError } from "$lib/api/api-error";
  import { closeSession } from "$lib/api/users/close-session";
  import Avatar from "$lib/components/Avatar.svelte";
  import Button from "$lib/components/Button.svelte";
  import ErrorText from "$lib/components/ErrorText.svelte";
  import PageContainer from "$lib/components/PageContainer.svelte";

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

<main class="flex h-screen w-screen flex-col items-center justify-center gap-2">
  {#if data.session && data.session.authenticated}
    {const user = data.session.user}
    <PageContainer class="sm:max-w-lh w-full max-w-sm lg:max-w-2xl">
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
            class="relative inline-block w-fit text-4xl leading-none font-black"
          >
            <span class="relative z-10">{user.name}!</span>
            <span
              class="absolute -bottom-0.5 left-[-2.5%] z-0 h-3 w-[110%] -skew-x-6 bg-blue-300"
            ></span>
          </h1>
        </div>

        <Avatar name={user.name} class="size-36" avatarUrl={user.avatarUrl} />
      </div>

      <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Button
          class="w-full font-bold"
          icon="ph:gear-bold"
          iconPosition="right"
          onclick={() => goto(resolve("/(app)/user/settings"))}
          shadowVariant="base"
        >
          Configurações
        </Button>

        <Button
          class="w-full font-bold"
          icon="ph:clock-counter-clockwise-bold"
          iconPosition="right"
          onclick={() => goto(resolve("/(app)/user/history"))}
          shadowVariant="base"
        >
          Histórico
        </Button>

        <Button
          class="w-full font-bold"
          icon="ph:sign-out-bold"
          iconPosition="right"
          onclick={logout}
          shadowVariant="base"
          variant="danger"
        >
          Sair
        </Button>
      </div>

      <ErrorText class="text-center" message={logoutError} />
    </PageContainer>
  {:else}
    <h1 class="text-center text-5xl font-semibold text-gray-800">
      “Seu caminho até a aprovação <span
        class="-m-1 rounded-md border-2 border-zinc-500/50 bg-blue-400/60 p-1 text-nowrap"
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
