import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import BoardHeader from "./BoardHeader";
import { useLocation } from "react-router";
import axios from "axios";

const BoardEdit = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  // 받아와야될 값이 id, value, text
  const handleSubmit = () => {
    axios.post("/board/update", {
      id: 1,
      title: value,
      contents: text,
      userId: 5,
      boardCategoryId: 1,
    })
    .then(res => res.data.body)
    .then(res=>console.log(res));

    setValue("");
    setText("");
    navigate("/");
  }

  return (
    <div className="card">
      <BoardHeader />
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
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default BoardEdit;
