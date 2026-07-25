<script lang="ts">
  import type { ResolvedPathname } from "$app/types";

  type Props = {
    text: string;
    href: ResolvedPathname;
    action: string;
  };

  let { text, href, action }: Props = $props();
</script>

<div class="mt-4 text-center text-sm text-neutral-600">
  {text}

  <a class="ml-1 font-black text-blue-600 hover:underline" {href}>
    {action}
  </a>
</div>
