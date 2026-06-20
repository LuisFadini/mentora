<script>
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar />

<main class="h-screen w-screen flex flex-col gap-2 justify-center items-center">
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
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
