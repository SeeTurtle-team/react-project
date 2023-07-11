import React, { useEffect, useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { errorHandle } from "../Common/ErrorHandle";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { BoardCategoryDto } from "../interface/BoardCategoryDto";

const BoardCreate = () => {
  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string|null>("");
  const [boardCategory, setBoardCategory] = useState<BoardCategoryDto[]>([]);
  const [isBoardCategory, setIsBoardCategory] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/board/category");
        setBoardCategory(res.data);
      } catch (error: any) {
        console.log(error);
        const errCode = errorHandle(error.response.status);
        navigate(`/ErrorPage/${errCode}`); // error 발생 시 이전 page 이동
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  const handleSubmit = () => {
    try{
    axios
      .post("/board/create", {
        title: value,
        contents: text,
        userId: 5,
        boardCategoryId: boardCategory,
      })
      .then((res) => res.data.body)
      .then((res) => console.log(res));
    setValue("");
    setText("");
    navigate("/BoardList");
    }
    catch (error: any) {
      console.log(error)
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };
  // 로그인 기능 및 boardCreate에 category 값 추가하기

  const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );
  };

  const header = renderHeader();

  const handleInputTitle = (e: DropdownChangeEvent) => {
    setBoardCategory(e.value);
    setIsBoardCategory(true);
  }


  const editorValue = (text:string|null) => {
    if(typeof(text)=='string'){
      return text
    }else{
      //에러처리
    }

  }
  return (
    <div className="card">
      <Dropdown 
      value={boardCategory} 
      onChange={handleInputTitle}
      options={boardCategory} 
      optionLabel="category" 
      placeholder="select category"
      style={{ marginBottom: "2rem" }}
      />
      <span className="p-float-label">
        <InputText
          id="Title"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={handleInputEnter}
          size={80}
        />
        <label htmlFor="Title">Title</label>
      </span>
      <h2>Content</h2>
      <Editor
        value={editorValue(text)}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
        style={{ height: "320px", marginBottom: "1rem" }}
        headerTemplate={header}
      />
      <Button 
      label="Submit" 
      onClick={handleSubmit} 
      disabled={!isBoardCategory}
      />
    </div>
  );
};

export default BoardCreate;
