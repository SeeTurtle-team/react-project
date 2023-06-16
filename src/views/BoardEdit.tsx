import React, { useState, useEffect } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Board } from "../interface/BoardList";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import BoardHeader from "./BoardHeader";
import { useParams } from "react-router";
import axios from "axios";

const BoardEdit = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [board, setBoard] = useState<Board[]>([]);
  const navigate = useNavigate();
  let params = useParams();
  let parmasUserId = Number(params.userId);
  console.log(params.userId);
  console.log(parmasUserId);
  // console.log(board[parmasUserId].board_title);
  // console.log(board[parmasUserId].board_contents);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setBoard([]);
        const response = await axios.get("/board");
        setBoard(response.data);
      } catch (error: any) {
        navigate(-1); // error 발생 시 이전 page 이동
      }
    };
    fetchUsers();
  }, [navigate]);

  console.log(board);



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
