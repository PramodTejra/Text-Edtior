import React from "react";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../hooks/useSlateHelpers";
import EditorButton from "./EditorButton";
import Icon from "./EditorIcons";

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <EditorButton
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </EditorButton>
  );
};

export default MarkButton;
