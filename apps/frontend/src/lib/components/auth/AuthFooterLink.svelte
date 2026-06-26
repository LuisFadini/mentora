<script lang="ts">
  import { resolve } from "$app/paths";
  import type { PathnameWithSearchOrHash } from "$app/types";
  import type { RouteIdWithSearchOrHash } from "$app/types";

  type Props = {
    text: string;
    href: RouteIdWithSearchOrHash | PathnameWithSearchOrHash;
    action: string;
  };

  let { text, href, action }: Props = $props();
</script>

<div class="mt-4 text-center text-sm text-neutral-600">
  {text}

  <a href={resolve(href)} class="ml-1 font-black text-blue-600 hover:underline">
    {action}
  </a>
</div>
