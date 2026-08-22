<script lang="ts">
  type Props = {
    activeStep: number;
    steps: string[];
  };

  let { activeStep = $bindable(0), steps = [] }: Props = $props();

  const progress = $derived((activeStep / (steps.length - 1)) * 100);
</script>

<nav>
  <ol class="relative mx-auto flex w-full max-w-xl items-start justify-between">
    <div
      class="absolute left-5 right-5 top-5 z-0 h-0.5 rounded-full bg-black/20"
      aria-hidden="true"
    >
      <div
        style={`width: ${progress}%`}
        class="h-full rounded-full bg-linear-to-r from-blue-100 via-blue-300 to-blue-400 transition-all duration-500"
      ></div>
    </div>

    {#each steps as step, index (step)}
      <li class="relative z-10 flex flex-col items-center">
        <button
          class="group flex cursor-pointer flex-col items-center gap-2"
          aria-current={activeStep === index ? "step" : undefined}
          aria-label={`Ir para ${step}`}
          onclick={() => (activeStep = index)}
          type="button"
        >
          <span
            class={[
              "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black font-bold transition-all",
              activeStep === index
                ? "bg-blue-300 shadow-[3px_3px_0_0_black]"
                : index < activeStep
                  ? "bg-blue-200"
                  : "bg-white",
            ]}
          >
            {index + 1}
          </span>

          <span
            class={[
              "whitespace-nowrap text-sm font-bold transition-colors",
              activeStep === index ? "text-black" : "text-gray-500",
            ]}
          >
            {step}
          </span>
        </button>
      </li>
    {/each}
  </ol>
</nav>
