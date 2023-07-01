import React, { useState, useEffect } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router";
import axios from "axios";
import { errorHandle } from "../Common/ErrorHandle";
import { BoardUpdateDto } from "../interface/BoardUpdateDto";

const BoardEdit = () => {
  const [text, setText] = useState<any>("");
  const [value, setValue] = useState<string>("");
  const [board, setBoard] = useState<BoardUpdateDto>(); //어차피 하나의 데이터만 받을텐데 왜 배열로 받죠?
  const navigate = useNavigate();
  const {boardId} = useParams(); //이렇게 하면 App.tsx에 있는 <Route path="/BoardEdit/:boardId" element={<BoardEdit />} /> 이부분에서 boardId 파라미터를 가져올 수 있습니다
 
  // console.log(board[parmasUserId].board_title);
  // console.log(board[parmasUserId].board_contents);
  const fetchUsers = async () => {
    try {
      setBoard(undefined);
      const boardIdNumber  = typeChangeStringToNumber(boardId);
      const response = await axios.post("/board/getUpdate",{
        boardId : boardIdNumber,
        userId : 5
      });

      console.log(response.data)
      console.log(response.data.success)

      if(!response.data.success){
        alert('권한이 없습니다');
        window.history.go(-1);
        return;
        
      }else{
        setBoard(response.data);
      }
     
    } catch (error: any) {
      console.log(error)
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  const typeChangeStringToNumber = (changeVar : any) => {
    if(typeof(changeVar)=='string'){return parseInt(changeVar);}
  }

  useEffect(() => {
    fetchUsers();
  }, []); // 렌더링 시 데이터를 한번만 불러올 때는 useEffect(()=>{},[])로 한번만 실행되게 합니다. 이렇게 받아온 데이터를 제목이랑 콘텐츠와 뿌려보세요

  // setValue(board.length !== 0 ? board[0].board_title : '');


  // 받아와야될 값이 id, value, text
  const handleSubmit = () => {
    axios
      .patch("/board/update", {
        id: Number(boardId),
        title: value,
        contents: text,
        userId: 5,
        boardCategoryId: 1,
      })
      .then((res) => res.data.body)
      .then((res) => console.log(res));

    setValue("");
    setText("");
    navigate("/BoardList");
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
        <label htmlFor="Title">{board?.title}</label>
      </span>
      <h2>Content</h2>
      <Editor
        value={board?.contents }
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
        style={{ height: "320px", marginBottom:'2rem' }}
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default BoardEdit;
