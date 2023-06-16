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
  const [text, setText] = useState<any>("");
  const [value, setValue] = useState<string>("");
  const [board, setBoard] = useState<Board[]>([]);
  const navigate = useNavigate();
  const {boardId} = useParams(); //이렇게 하면 App.tsx에 있는 <Route path="/BoardEdit/:boardId" element={<BoardEdit />} /> 이부분에서 boardId 파라미터를 가져올 수 있습니다
 
  // console.log(board[parmasUserId].board_title);
  // console.log(board[parmasUserId].board_contents);
  const fetchUsers = async () => {
    try {
      setBoard([]);
      const response = await axios.get("/board/read/"+boardId);
      setBoard(response.data);
    } catch (error: any) {
      alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.'); //에러 핸들링 필수!!!!!
      navigate(-1); // error 발생 시 이전 page 이동
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // 렌더링 시 데이터를 한번만 불러올 때는 useEffect(()=>{},[])로 한번만 실행되게 합니다. 이렇게 받아온 데이터를 제목이랑 콘텐츠와 뿌려보세요

  

  // 받아와야될 값이 id, value, text
  const handleSubmit = () => {
    axios
      .post("/board/update", {
        id: 1,
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

  return (
    <div className="card">
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
