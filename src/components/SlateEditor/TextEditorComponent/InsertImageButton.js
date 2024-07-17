import React, { useRef } from "react";
import { useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import { Image } from "@mui/icons-material";
import Icon from "./EditorIcons";
import EditorButton from "./EditorButton";
import { uploadFile } from "react-s3";


const InsertImageButton = () => {
  const editor = useSlateStatic();
  const fileInputRef = useRef();

  const insertImage = (editor, url) => {
    const imageNode = {
      type: "image",
      url,
      children: [{ text: "" }], // Ensure there's a text node as a child
    };
    Transforms.insertNodes(editor, imageNode);
  };

  const config = {
    bucketName: process.env.REACT_APP_REDYHIRE_AWS_BUCKET_NAME,
    region: process.env.REACT_APP_REDYHIRE_AWS_REGION,
    accessKeyId: process.env.REACT_APP_REDYHIRE_AWS_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_REDYHIRE_AWS_ACCESS_KEY,
    dirName: "AssementImages",
  };

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file,config)
      .then((res) => {
        if(res.location){
        insertImage(editor,res.location);
        }
      })
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        alert("Selected file is not an image");
        return;
      }
    }
  };

  return (
    <div>
      <EditorButton
        onMouseDown={(event) => {
          event.preventDefault();
          fileInputRef.current.click();
        }}
      >
        <Icon>
          <Image />
        </Icon>
      </EditorButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InsertImageButton;
