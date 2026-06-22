<script>
  let { header, subtitle } = $props();
</script>

<div class="mb-6">
  <h1 class="relative inline-block text-4xl font-black leading-none">
    <span class="relative z-10">{header}</span>
    <span
      class="absolute -bottom-0.5 left-[-2.5%] h-3 w-[105%] z-0 -skew-x-6 bg-blue-300"
    >
    </span>
  </h1>
  <p class="mt-1 text-neutral-600">
    {subtitle}
  </p>
</div>
