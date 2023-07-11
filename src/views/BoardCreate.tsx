import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { errorHandle } from "../Common/ErrorHandle";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface CategoryDTO {
  name: string;
  number: number;
}

const BoardCreate = () => {
  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState< CategoryDTO | null>(null);
  const navigate = useNavigate();
  const Category: CategoryDTO[] = [
    { name: 'IT개발', number: 1 },
    { name: '법률', number: 2 },
    { name: '스포츠', number: 3 },
  ]

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  const handleSubmit = () => {
    try{
    axios
      .post("/board/create", {
        title: value,
        contents: text,
        userId: 5,
        boardCategoryId: selectCategory?.number,
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
          style={{ marginBottom: "1rem" }}
        />
        <label htmlFor="Title">Title</label>
      </span>
      <Dropdown 
      value={selectCategory} 
      onChange={(e: DropdownChangeEvent) => setSelectCategory(e.value)} 
      options={Category} optionLabel="name" 
      placeholder="select category"
      />
      <h2>Content</h2>
      <Editor
        value={text}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.textValue)}
        style={{ height: "320px", marginBottom: "1rem" }}
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default BoardCreate;
