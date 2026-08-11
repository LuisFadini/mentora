<script lang="ts">
  import {
    ALL_TRANSFORMERS,
    AutoLinkNode,
    AutoLinkPlugin,
    CheckListPlugin,
    Composer,
    ContentEditable,
    convertFromMarkdownString,
    convertToMarkdownString,
    HeadingNode,
    ListItemNode,
    ListNode,
    ListPlugin,
    RichTextPlugin,
  } from "svelte-lexical";
  import { theme } from "svelte-lexical/dist/themes/default";

  import MarkDownTB from "./MarkDownToolBar.svelte";

  type Props = {
    title: string;
    composer_s: string;
  };

  let { title, composer_s = $bindable() }: Props = $props();
  let composer: Composer;
  let editor;
  const initialConfig = {
    theme: theme,
    namespace: "contentMarkdown",
    nodes: [HeadingNode, ListNode, ListItemNode, AutoLinkNode],

    onError: (error: Error) => {
      throw error;
    },
  };
  function saveMark() {
    editor = composer.getEditor();
    editor.read(() => {
      composer_s = convertToMarkdownString(ALL_TRANSFORMERS);
    });
  }

  function loadMark() {
    editor = composer.getEditor();
    editor.update(() => {
      convertFromMarkdownString(composer_s);
    });
  }
</script>

<div class="flex flex-col">
  <label
    class="relative inline-block text-2xl font-black leading-none"
    for={title}>{title}</label
  >

  <Composer bind:this={composer} {initialConfig}>
    <div class="editor-shell svelte-lexical">
      <MarkDownTB />
      <div class="editor-container">
        <div class="editor-scroller">
          <div class="editor">
            <ContentEditable />
          </div>
        </div>

        <RichTextPlugin />
        <ListPlugin />
        <CheckListPlugin />

        <AutoLinkPlugin />
      </div>
    </div>
  </Composer>
  <div class="flex justify-between">
    <button
      class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
      onclick={loadMark}
      type="button"
    >
      Import Changes
    </button>
    <button
      class="shrink-0 rounded-lg border-2 border-black bg-blue-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:w-auto"
      onclick={saveMark}
      type="button"
    >
      Save Changes
    </button>
  </div>
</div>
