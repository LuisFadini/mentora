<script>
  import Icon from "@iconify/svelte"

  let headerLinks = [
    {
      href: "/",
      text: "Questões"
    },
    {
      href: "/",
      text: "Conteúdos"
    },
    {
      href: "/",
      text: "Fórum"
    },
  ]
</script>

<header class="fixed z-50 bg-white w-full border-b-2 flex flex-row items-center justify-evenly p-2">
  <a class="flex flex-row gap-2 items-center flex-1" href="/">
    <img class="h-12 rounded-md bg-gray-600" src="https://api.dicebear.com/10.x/triangles/svg?seed=Mentora" alt="">
    <p class="text-2xl font-bold">Mentora</p>
  </a>
  <ul class="flex flex-row max-w-1/2 justify-evenly mx-auto flex-1">
    {#each headerLinks as link}
      <li class="text-2xl font-bold hover:underline decoration-2 transition-all text-gray-900 hover:text-blue-400 duration-150">
        <a href={link.href}>{link.text}</a>
      </li>
    {/each}
  </ul>
  <div class="flex flex-row items-center justify-end flex-1"><button class="flex flex-row gap-3 items-center hover:bg-blue-400 bg-blue-500 py-2 px-6 font-bold border-2 rounded-md text-white border-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">Login <Icon icon="ph:sign-in-bold" font-size="20" /></button></div>
</header>

<main class="h-screen w-screen flex flex-col gap-2 justify-center items-center">
  <h1 class="text-center text-5xl font-semibold text-gray-800">“Seu caminho até a aprovação <span class="bg-blue-400/60 -m-1 p-1 rounded-md border-2 border-zinc-500/50">começa aqui</span>”</h1>
  <h2 class="text-center text-2xl">Resolva, revise e acompanhe seu desempenho em um só lugar.</h2>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply bg-blue-100 inset-0 h-full w-full bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>