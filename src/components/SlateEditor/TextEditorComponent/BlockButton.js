import React from "react";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../hooks/useSlateHelpers";
import EditorButton from "./EditorButton";
import Icon from "./EditorIcons";

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <EditorButton
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </EditorButton>
  );
};

export default BlockButton;
