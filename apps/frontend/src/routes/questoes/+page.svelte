<script lang="ts">
  import { resolve } from "$app/paths";
  import { getQuestions } from "$lib/api/questions/get-questions";
  let questions = getQuestions();
</script>

<main class="h-screen w-screen flex flex-col gap-2 justify-center items-center">
  <div
    class="w-full max-w-sm sm:max-w-lg lg:max-w-xl rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_black]"
  >
    <div class="flex flex-col">
      {#each questions as question (question.id)}
        <div
          class="flex rounded-lg border-2 border-black justify-between m-2 p-4"
        >
          {question.titulo} - {question.enunciado}
          <a
            href={resolve("/")}
            class="rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >Resolva</a
          >
        </div>
      {/each}
    </div>
    <div class="flex flex-col items-center justify-center">
      <a
        href={resolve(`/questoes/edicao`)}
        class="rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >Criar Novas</a
      >
    </div>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
