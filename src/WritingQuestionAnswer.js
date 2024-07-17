import React, { useCallback, useMemo } from "react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import isHotkey from "is-hotkey";
import { Transforms, createEditor} from "slate";
import {
  Slate,
  Editable,
  withReact,
} from "slate-react";
import { withHistory } from "slate-history";
// import { css } from "@emotion/css";
// import EditorButton from "./TextEditorComponent/EditorButton";
// import Icon from "./TextEditorComponent/EditorIcons";
import { toggleMark } from "../../../common/components/SlateEditor/hooks/useSlateHelpers";
import Element from "../../../common/components/SlateEditor/Element";
import Leaf from "../../../common/components/SlateEditor/Leaf";
import initialValue from "../../../common/components/SlateEditor/initialValue";
import { Box } from "@mui/material";
import InsertImageButton from "../../../common/components/SlateEditor/TextEditorComponent/InsertImageButton";
import EditorToolbar from "../../../common/components/SlateEditor/EditorToolbar";
// import { Delete } from "@mui/icons-material";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const labelStyle = {
  position: "absolute",
  top: -12,
  left: 8,
  pointerEvents: "none",
  color: "gray",
  zIndex: 1,
  background: "white",
  paddingLeft: "4px",
  paddingRight: "4px",
};

const editableStyle = {
  width: "100%",
  height: "450px",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "4px",
  border: "2px solid #4C178D",
  boxSizing: "border-box",
  outline: "none",
  overflowY: "auto",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  lineHeight: "1.2",
  marginBottom: "20px",
};

const boxSx = {
  bgcolor: "white.main",
  width: "100%",
  marginTop: "20px",
  position: "relative",
  marginBottom: "-10px",
};

const WritingQuestionAnswer = ({ answer, handleChoice }) => {
  const viewportHeight = useMemo(() => {
    return window.visualViewport.height;
  }, [window.visualViewport.height]);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // const renderImage = useCallback((props) => <ImageElement {...props} />, []);


  const handleSave = (value) => {
    const content = JSON.stringify(value, null, 2);
    handleChoice({target:{value:content}});
    // console.log("Editor content:", content);
  };
  // console.log(answer);
  return (
    <Slate
      editor={editor}
      initialValue={answer? JSON.parse(answer):initialValue}
      onChange={(value) => {
        handleSave(value); // Log content on every change
      }}
    >
      <EditorToolbar>
        <InsertImageButton />
      </EditorToolbar>
      <Box sx={boxSx}>
        <label style={labelStyle}>
          Write your answer here
        </label>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          // renderImage={renderImage}
          placeholder=""
          rows={2 * Math.round(viewportHeight / 100) + 9}
          style={editableStyle}
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Box>
    </Slate>
  );
};

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image: ImageElement = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

export default WritingQuestionAnswer;
