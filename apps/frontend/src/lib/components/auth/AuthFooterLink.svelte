<script>
    import { resolve } from "$app/paths";

  let { text, href, action } = $props();
</script>

<div class="mt-4 text-center text-sm text-neutral-600">
  {text}

  <a
    href={resolve(href)}
    class="ml-1 font-black text-blue-600 hover:underline"
  >
    {action}
  </a>
</div>