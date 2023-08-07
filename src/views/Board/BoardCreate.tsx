import React, { useContext, useEffect, useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { errorHandle } from "../../Common/ErrorHandle";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { BoardCategoryDto } from "../../interface/BoardCategoryDto";
import { useCookies } from "react-cookie";
import { ActiveIndexContext, ActiveIndexContextProviderProps } from "../../context/ActiveIndexContext";
import { useMutation, useQueryClient } from 'react-query';

const BoardCreate = () => {
  const [value, setValue] = useState<string>("");
  const [text, setText] = useState<string|null>("");
  const [boardCategory, setBoardCategory] = useState<BoardCategoryDto[]>([]);
  const [selectBoardCategory, setSelectBoardCategory] = useState<BoardCategoryDto|null>(null);
  const [isBoardCategory, setIsBoardCategory] = useState<boolean>(false);
  const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
  useContext(ActiveIndexContext);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = {Authorization:'Bearer '+accessToken}
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    setActiveIndex(1);
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/board/category", {headers});
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

  const createBoardMutation = useMutation(
    (newBoardData: { title: string, contents: string, boardCategoryId: number }) =>
      axios.post('/board/create', newBoardData, { headers }).then(res => res.data.body)
  );

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  const handleSubmit = async () => {
    try {
      const newBoardData = {
        title: value,
        contents: text || '',
        boardCategoryId: selectBoardCategory?.id || 0,
      };
      await createBoardMutation.mutateAsync(newBoardData);
      setValue('');
      setText('');
      queryClient.refetchQueries('getBoardList');
      navigate('/BoardList');
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  // const handleSubmit = async () => {
  // try{
  //   axios
  //     .post("/board/create", {
  //       title: value,
  //       contents: text,
  //       boardCategoryId: selectBoardCategory?.id,
  //     }, {
  //       headers: headers
  //     })
  //     .then((res) => res.data.body)
  //     .then((res) => console.log(res));
  //   setValue("");
  //   setText("");
  //   navigate("/BoardList");
  //   }
  //   catch (error: any) {
  //     console.log(error)
  //     const errCode = errorHandle(error.response.status);
  //     navigate(`/ErrorPage/${errCode}`);
  //   }
  // };

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
    setSelectBoardCategory(e.value);
    setIsBoardCategory(true);
  }


  const editorValue = (text:string|null) => {
    if(typeof(text)=='string'){
      return text
    }else{
      //에러처리
    }

  }

  const [selectedFile, setSelectedFile] = useState<any>('');

  const handleFileInput = async (e: any) => {
    const img = e.target.files[0];
    console.log(img);
  
    const formData = new FormData();
    formData.append("file", img);
  
    try {
      const s3UrlResponse = await axios.get("/board/s3url", { headers });
      console.log(s3UrlResponse);
  
      const presignedURL = s3UrlResponse.data.data;
  
      await fetch(presignedURL, {
        method: "PUT",
        headers: {
          "Content-Type": img.type,
        },
        body: img,
      });
      console.log(s3UrlResponse.data.data.split('?')[0]);
      const imgURL = s3UrlResponse.data.data.split('?')[0];
      setText(text+`<p><img src=${imgURL}></p>`);

      // axios.post("/board/imgurl", {
      //   imgURL:imgURL
      // },{
      //   headers: headers
      // })

    // axios.post("/board/img", formData,{
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }).then(res => {
    //   console.log(res.data.location)
    //   alert('성공')
    // }).catch(err => {
    //   alert('실패')
    // })
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
  }

  }

 
  return (
    <div className="card">
      <Dropdown 
      value={selectBoardCategory} 
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
        style={{ minHeight: '400px', height: "auto" , marginBottom: "1rem" }}
        headerTemplate={header}
      />

      <input type="file" onChange={handleFileInput}/>
      <Button 
      label="Submit" 
      disabled={!isBoardCategory}
      onClick={handleSubmit}
      />
    </div>
  );
};

export default BoardCreate;
