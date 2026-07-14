<script lang="ts">
  import { RichTextComposer } from "svelte-lexical";
  import { theme } from "svelte-lexical/dist/themes/default";

  // your script goes here
</script>

<main class="min-h-screen flex items-center justify-center p-4">
  <div
    class="flex w-full max-w-4xl flex-col gap-2 rounded-xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_0_black] sm:p-6"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="relative inline-block text-4xl font-black leading-none">
        <span class="bg-blue-100"> Editor Questao </span>
      </h1>
    </div>
    <RichTextComposer {theme} />
    <button
      class="px-5 py-2 font-bold text-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_black] sm:p-2 bg-blue-500 transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
      >Editar</button
    >
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply inset-0 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
