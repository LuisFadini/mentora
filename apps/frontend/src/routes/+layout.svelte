<script lang="ts">
  import "./layout.css";

  import favicon from "$lib/assets/favicon.ico";
  import Navbar from "$lib/components/Navbar.svelte";

  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<Navbar session={data.session} />

<svelte:head><link href={favicon} rel="icon" /></svelte:head>

{@render children()}
