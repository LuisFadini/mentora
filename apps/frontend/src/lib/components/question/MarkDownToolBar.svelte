<script lang="ts">
  import {
    BlockFormatDropDown,
    BoldButton,
    NumberDropDrownItem,
    Divider,
    ItalicButton,
    UnderlineButton,
    StrikethroughButton,
    FormatCodeButton,
    DropDownAlign,
    FontFamilyDropDown,
    HeadingDropDownItem,
    CheckDropDrownItem,
    FontSizeEntry,
    Toolbar,
  } from "svelte-lexical";
</script>

<Toolbar>
  {#snippet children({ editor, activeEditor, blockType })}
    <BlockFormatDropDown>
      <HeadingDropDownItem headingSize="h1" />
      <HeadingDropDownItem headingSize="h2" />
      <HeadingDropDownItem headingSize="h3" />
      <NumberDropDrownItem />
      <CheckDropDrownItem />
    </BlockFormatDropDown>
    <Divider />
    <FontFamilyDropDown />
    <Divider />

    <FontSizeEntry />
    <Divider />
    <BoldButton />
    <ItalicButton />
    <UnderlineButton />
    <StrikethroughButton />
    <FormatCodeButton />
    <Divider />
    <DropDownAlign />
  {/snippet}
</Toolbar>
