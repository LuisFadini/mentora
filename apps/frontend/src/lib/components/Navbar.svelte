<script lang="ts">
  import { hasPermission } from "@mentora/permissions";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import type { ResolvedPathname } from "$app/types";
  import type { Session } from "$lib/api/users/get-session";

  import Avatar from "./Avatar.svelte";
  import Button from "./Button.svelte";

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

  const headerLinks = $derived.by(() => {
    const links: HeaderLink[] = [
      { href: resolve("/questions"), text: "Questões" },
    ];

    if (session?.authenticated) {
      if (hasPermission(session.user, "materials.access")) {
        links.push({ href: resolve("/"), text: "Conteúdos" });
      }

      if (hasPermission(session.user, "forum.access")) {
        links.push({ href: resolve("/"), text: "Fórum" });
      }
    }

    return links;
  });
</script>

<header class="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white">
  <div
    class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"
  >
    <a class="flex flex-row gap-2 items-center" href={resolve("/")}>
      <img
        class="h-12 rounded-md bg-gray-600"
        alt=""
        src="https://api.dicebear.com/10.x/triangles/svg?seed=Mentora"
      />
      <p class="text-2xl font-bold hidden lg:block">Mentora</p>
    </a>

    <nav class="hidden lg:block">
      <ul class="flex items-center gap-8">
        {#each headerLinks as link (link.text)}
          <li
            class="text-2xl font-bold hover:underline decoration-2 transition-all text-gray-900 hover:text-blue-400 duration-150"
          >
            <a href={link.href}>{link.text}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="flex items-center gap-3">
      {#if session && session.authenticated}
        {const user = session.user}
        <div class="hidden sm:flex items-center gap-3">
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
        </div>
      {:else}
        <Button
          class="hidden sm:flex px-4 py-2 font-bold text-white"
          icon="ph:sign-in-bold"
          iconClass="text-lg"
          iconPosition="right"
          onclick={async () => await goto(resolve("/login"))}
          variant="primary"
        >
          Login
        </Button>
      {/if}

      <Button
        class="size-11 flex lg:hidden"
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
      class="absolute top-full left-0 right-0 border-y-2 border-black bg-white p-4 shadow-[0_6px_0_0_black] lg:hidden"
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

        {#if session && session.authenticated}
          {const user = session.user}
          <div
            class="mb-4 flex sm:hidden items-center gap-3 rounded-lg border-2 border-black bg-gray-50 p-3"
          >
            <Avatar
              name={user.name}
              class="size-12 shrink-0"
              avatarUrl={user.avatarUrl}
            />

            <span class="min-w-0 flex-1 truncate font-bold" title={user.name}>
              {user.name}
            </span>
          </div>
        {:else}
          <Button
            class="mt-2 flex sm:hidden font-bold"
            icon="ph:sign-in-bold"
            iconPosition="right"
            onclick={async () => await goto(resolve("/login"))}
            variant="primary"
          >
            Login
          </Button>
        {/if}
      </ul>
    </div>
  {/if}
</header>
