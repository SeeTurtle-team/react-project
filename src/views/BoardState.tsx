import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Panel } from "primereact/panel";
import { useParams } from "react-router";
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";
import { BoardUpdateDto } from "../interface/BoardUpdateDto";
import { Button } from "primereact/button";
import { dateFormatFunc } from "../Common/DateFormat";
import BoardComment from "./BoardComment";
import { Editor } from "primereact/editor";
import { ActiveIndexContext, ActiveIndexContextProviderProps } from "../context/ActiveIndexContext";
const BoardState = () => {
  const [board, setBoard] = useState<BoardUpdateDto>();
  const {activeIndex, setActiveIndex}:ActiveIndexContextProviderProps = useContext(ActiveIndexContext);

  const { index } = useParams();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setActiveIndex(1);
    try {
      const response = await axios.get("/board/read/" + index);
      console.log(response.data)
      setBoard(response.data);
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBoardLike = async () => {
    try {
      axios.post("/board/recommend", {
        userId: 5,
        boardId: Number(index),
      }).then(response => {
        console.log(response.data)
        if(response.data.success===true){
          fetchUsers();
        }else{
          alert(response.data.msg);
          return;
        }
      });
      
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };
  
  const renderHeader = () => {
      return (
          <span className="ql-formats">
          </span>
      );
  }

  const header = renderHeader();
  const modules = {
    toolbar: false
  }

  return (
    <div className="card">
      <Card style={{ marginBottom: "2rem", backgroundColor: 'transparent' }} title={board?.title}>
        <Editor 
          value={board?.contents}
          name="blog" 
          headerTemplate={header} 
          modules={modules}
          readOnly={true}
        />
      </Card>
      <div style={{ marginBottom: "1rem" }}>
        <span>
          <Button
            icon="pi pi-thumbs-up"
            rounded
            outlined
            className="mr-2"
            onClick={() => handleBoardLike()}
            style={{ marginRight: "1rem" }}
          />
          <p className="m-0">추천수: {board?.recommendCount ==null ? 0 : board?.recommendCount}</p>
          <p className="m-0" style={{ marginRight: "2rem" }}>
            작성일: {dateFormatFunc(board?.dateTime)}
          </p>
        </span>
      </div>
      <BoardComment index={index}/>
    </div>
  );
};

export default BoardState;