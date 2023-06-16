import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import BoardHeader from "./BoardHeader";
import axios from "axios";

const BoardCreate = () => {
  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  const handleSubmit = () => {
    axios
      .post("/board/create", {
        title: value,
        contents: text,
        userId: 5,
        boardCategoryId: 1,
      })
      .then((res) => res.data.body)
      .then((res) => console.log(res));

    setValue("");
    setText("");
    navigate("/");
  };
  // 로그인 기능 및 boardCreate에 category 값 추가하기

  return (
    <div className="card">
      {/* <BoardHeader /> */} {/**이건 도대체 왜 페이지마다 들어가 잇는거죠..??? */}
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
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default BoardCreate;
