import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import BoardHeader from "./BoardHeader";

const BoardCreate = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<string>("");

  return (
    <div className="card">
      <BoardHeader />
      <br />
      <span className="p-float-label">
        <InputText
          id="Title"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          size={80}
        />
        <label htmlFor="Title">Title</label>
      </span>
      <h2>Content</h2>
      <Editor
        value={text}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
        style={{ height: "320px" }}
      />
      <br />
      <FileUpload
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
      <br />
      <Button label="Submit" />
    </div>
  );
};

export default BoardCreate;
