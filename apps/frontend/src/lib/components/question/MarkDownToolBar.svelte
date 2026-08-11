<script lang="ts">
  import {
    BlockFormatDropDown,
    BoldButton,
    CheckDropDrownItem,
    Divider,
    DropDownAlign,
    FontFamilyDropDown,
    FontSizeEntry,
    FormatCodeButton,
    HeadingDropDownItem,
    ItalicButton,
    NumberDropDrownItem,
    StrikethroughButton,
    Toolbar,
    UnderlineButton,
  } from "svelte-lexical";
</script>

<Toolbar>
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
</Toolbar>
