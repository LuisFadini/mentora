<script lang="ts">
  import { createQuestion } from "$lib/api/questions/create-question";

  let question_name: string = $state("");
  let question_description: string = $state("");
  function onSubmit() {
    let status: number = createQuestion({
      id: 0,
      titulo: question_name,
      enunciado: question_description,
    });
    if (!status) return;

    //goto(resolve("/questoes"));
  }
</script>

<main class="h-screen w-screen flex flex-col gap-2 justify-center items-center">
  <div
    class="w-full max-w-sm sm:max-w-lg lg:max-w-xl rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_black]"
  >
    <form
      class="flex flex-col gap-5 novalidate justify-center items-center"
      onsubmit={onSubmit}
    >
      <label>
        Question Name: {question_name}<br />
        <input
          bind:value={question_name}
          class="border-black border-2 rounded-xl p-1"
        />
      </label><br />
      <label>
        Description: {question_description}<br />
        <input
          bind:value={question_description}
          class="border-black border-2 rounded-xl p-1"
        />
      </label><br />
      <button
        type="submit"
        class="mt-2 rounded-lg cursor-pointer border-2 border-black px-5 py-3 font-black text-white transition-all enabled:bg-blue-500 enabled:shadow-[4px_4px_0_0_black] enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
        >Send</button
      >
    </form>
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";

  :global(body) {
    @apply h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[48px_48px];
  }
</style>
