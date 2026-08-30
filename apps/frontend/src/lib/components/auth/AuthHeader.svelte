<script lang="ts">
  type Props = {
    header: string;
    subtitle: string;
  };

  let { header, subtitle }: Props = $props();
</script>

<div class="mb-6">
  <h1 class="relative inline-block text-4xl leading-none font-black">
    <span class="relative z-10">{header}</span>
    <span
      class="absolute -bottom-0.5 left-[-2.5%] z-0 h-3 w-[105%] -skew-x-6 bg-blue-300"
    >
    </span>
  </h1>
  <p class="mt-1 text-neutral-600">
    {subtitle}
  </p>
</div>
