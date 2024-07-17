import React from 'react';
import Toolbar from './TextEditorComponent/ToolbarMenu';
import BlockButton from './TextEditorComponent/BlockButton';
import MarkButton from './TextEditorComponent/MarkButton';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  LooksOne,
  LooksTwo,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from '@mui/icons-material';
import InsertImageButton from './TextEditorComponent/InsertImageButton';

const EditorToolbar = () => (
  <Toolbar>
    <MarkButton format="bold" icon={<FormatBold />} />
    <MarkButton format="italic" icon={<FormatItalic />} />
    <MarkButton format="underline" icon={<FormatUnderlined />} />
    <MarkButton format="code" icon={<Code />} />
    <BlockButton format="heading-one" icon={<LooksOne />} />
    <BlockButton format="heading-two" icon={<LooksTwo />} />
    <BlockButton format="block-quote" icon={<FormatQuote />} />
    <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
    <BlockButton format="bulleted-list" icon={<FormatListBulleted />} />
    <BlockButton format="left" icon={<FormatAlignLeft />} />
    <BlockButton format="center" icon={<FormatAlignCenter />} />
    <BlockButton format="right" icon={<FormatAlignRight />} />
    <BlockButton format="justify" icon={<FormatAlignJustify />} />
    {/* <InsertImageButton/> */}
  </Toolbar>
);

export default EditorToolbar;
