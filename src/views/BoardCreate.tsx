import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import BoardHeader from "./BoardHeader";
import axios from "axios";

const BoardCreate = () => {
  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string>("");
  // const [url, setUrl] = useState<string>("");

  const handleInputEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {

  }
  const handleSubmit = () => {
    console.log("submit");
    axios.post("/board/create", {
      title: value,
      contents: text,
      userId: 5,
      boardCategoryId: 1,
    })
    .then(res => res.data.body)
    .then(res=>console.log(res));

    setValue("");
    setText("");
  }

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
          onKeyDown={handleInputEnter}
          size={80}
        />
        <label htmlFor="Title">Title</label>
      </span>
      <h2>Content</h2>
      <Editor
        value={text}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.textValue)}
        style={{ height: "320px" }}
      />
      <Button label="Submit" onClick={handleSubmit}/>
    </div>
  );
};

export default BoardCreate;
