<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import type { ResolvedPathname } from "$app/types";
  import type { Session } from "$lib/api/users/get-session";

  import Avatar from "./Avatar.svelte";
  import Button from "./Button.svelte";
  import Separator from "./Separator.svelte";

  type Props = {
    session?: Session;
  };

  let { session }: Props = $props();

  let mobileMenuOpen = $state(false);

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMenu() {
    mobileMenuOpen = false;
  }

  type HeaderLink = {
    href: ResolvedPathname;
    text: string;
  };

  const headerLinks: HeaderLink[] = [
    { href: resolve("/questions"), text: "Questões" },
  ];

  async function redirect(url: ResolvedPathname) {
    closeMenu();
    await goto(url);
  }
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white">
  <div
    class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"
  >
    <a class="flex flex-row items-center gap-2" href={resolve("/")}>
      <img
        class="h-12 rounded-md bg-blue-300"
        alt="logo"
        src="/logo-sem-fundo.png"
      />
      <p class="hidden text-2xl font-bold lg:block">Mentora</p>
    </a>

    <nav class="hidden lg:block">
      <ul class="flex items-center gap-8">
        {#each headerLinks as link (link.text)}
          <li
            class="text-2xl font-bold text-gray-900 decoration-2 transition-all duration-150 hover:text-blue-400 hover:underline"
          >
            <a href={link.href}>{link.text}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="flex items-center gap-3">
      {#if session && session.authenticated}
        {const user = session.user}
        <button
          class="hidden cursor-pointer items-center gap-3 sm:flex"
          onclick={async () => await redirect("/user/settings")}
          type="button"
        >
          <span
            class="max-w-32 truncate text-right font-bold text-black"
            title={user.name}
          >
            {user.name}
          </span>

          <Avatar
            name={user.name}
            class="size-11 shrink-0"
            avatarUrl={user.avatarUrl}
          />
        </button>
      {:else}
        <Button
          class="hidden px-4 py-2 font-bold text-white sm:flex"
          icon="ph:sign-in-bold"
          iconClass="text-lg"
          iconPosition="right"
          onclick={async () => await redirect("/login")}
          variant="primary"
        >
          Login
        </Button>
      {/if}

      <Button
        class="flex size-11 lg:hidden"
        aria-label="Abrir menu"
        icon={mobileMenuOpen ? "ph:x-bold" : "ph:list-bold"}
        iconClass="text-2xl"
        onclick={toggleMenu}
        variant="secondary"
      />
    </div>
  </div>

  {#if mobileMenuOpen}
    <div
      class="absolute top-full right-0 left-0 border-y-2 border-black bg-white p-4 shadow-[0_6px_0_0_black] lg:hidden"
    >
      <ul class="flex flex-col gap-3">
        {#each headerLinks as link (link.text)}
          <li>
            <a
              class="flex items-center rounded-lg border-2 border-black bg-white px-4 py-3 font-bold shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-blue-100 hover:shadow-none"
              href={link.href}
              onclick={closeMenu}
            >
              {link.text}
            </a>
          </li>
        {/each}

        <Separator class="flex bg-blue-200 shadow-none sm:hidden" />

        {#if session && session.authenticated}
          {const user = session.user}
          <button
            class="mb-4 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-black bg-gray-50 p-3 sm:hidden"
            onclick={async () => await redirect("/user/settings")}
            type="button"
          >
            <Avatar
              name={user.name}
              class="size-12 shrink-0"
              avatarUrl={user.avatarUrl}
            />

            <span class="min-w-0 flex-1 truncate font-bold" title={user.name}>
              {user.name}
            </span>
          </button>
        {:else}
          <Button
            class="flex font-bold sm:hidden"
            icon="ph:sign-in-bold"
            iconPosition="right"
            onclick={async () => await redirect("/login")}
            variant="primary"
          >
            Login
          </Button>
        {/if}
      </ul>
    </div>
  {/if}
</header>
