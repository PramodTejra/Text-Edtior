import React, { useCallback, useMemo } from "react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import isHotkey from "is-hotkey"; // Ensure this import is present
import { Transforms, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Box } from "@mui/material";
import InsertImageButton from "../src/components/SlateEditor/TextEditorComponent/InsertImageButton";
import EditorToolbar from "../src/components/SlateEditor/EditorToolbar";
import Element from "../src/components/SlateEditor/Element";
import Leaf from "../src/components/SlateEditor/Leaf";
import initialValue from "../src/components/SlateEditor/initialValue";
import { toggleMark } from "../src/components/SlateEditor/hooks/useSlateHelpers";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const App = ({ answer }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const handleSave = (value) => {
    const content = JSON.stringify(value, null, 2);
    // handleChoice({ target: { value: content } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ marginBottom: "10px", color: "grey" }}>RICH TEXT EDITOR</h1>
      <Box sx={boxSx}>
 <Slate editor={editor} initialValue={initialValue}>
          <EditorToolbar>
            {/* <InsertImageButton /> */}
          </EditorToolbar>
          <Box sx={editorBoxSx}>
            <label style={labelStyle}>
              Write your text here
            </label>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder=""
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
      </Box>
    </div>
  );
};

const boxSx = {
  bgcolor: "white.main",
  width: "80%", // Adjust width as needed
  maxWidth: "1000px", // Adjust max width if necessary
  marginTop: "20px",
  marginBottom: "20px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  ":hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
  },
};

const editorBoxSx = {
  position: "relative",
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
  transition: "top 0.3s ease, color 0.3s ease",
  ":hover": {
    color: "black",
    top: -20,
  },
};

const editableStyle = {
  width: "100%", // Full width of the editor container
  height: "500px", // Increased height
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
  transition: "height 0.3s ease, border-color 0.3s ease",
  ":hover": {
    height: "550px",
    borderColor: "#6D309A",
  },
};

export default App;
