import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { errorHandle } from "../../Common/ErrorHandle";
import axios from "axios";
import { BoardUpdateDto } from "../../interface/BoardUpdateDto";
import { Button } from "primereact/button";
import { dateFormatFunc } from "../../Common/DateFormat";
import BoardComment from "./BoardComment";
import { Editor } from "primereact/editor";
import {
  ActiveIndexContext,
  ActiveIndexContextProviderProps,
} from "../../context/ActiveIndexContext";
import { useCookies } from "react-cookie";

const BoardState = () => {
  const [board, setBoard] = useState<BoardUpdateDto>();
  const { activeIndex, setActiveIndex }: ActiveIndexContextProviderProps =
    useContext(ActiveIndexContext);
  const { index } = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = {Authorization:'Bearer '+accessToken}

  const fetchUsers = async () => {
    setActiveIndex(1);
    try {
      const response = await axios.get("/board/read/" + index, {headers});
      console.log(response.data);
      if(response.data.success!=undefined || response.data.success==false){
        alert(response.data.msg);
        window.history.go(-1);
      }else{
        setBoard(response.data);

      }
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
      axios
        .post("/board/recommend", {
          boardId: Number(index),
        }, {headers})
        .then((response) => {
          console.log(response.data);
          if (response.data.success === true) {
            fetchUsers();
          } else {
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
    return <span className="ql-formats"></span>;
  };

  const header = renderHeader();
  const modules = {
    toolbar: false,
  };

  const goToBoardEdit = (boardId: number) => {
    navigate(`/BoardEdit/${boardId}`);
  };
  const handleBoardDelete = async (index: number | undefined) => {
    try {
      axios.delete("/board/delete", {
        data: {
          id: index,
        },
        headers: headers,
      });
      const response = await axios.get("/board", {headers});
      setBoard(response.data);
      navigate('/BoardList')
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  return (
    <div className="card">
      <Card
        style={{ marginBottom: "2rem", backgroundColor: "transparent" }}
        title={board?.title}
        // className="min-h-screen"
      >
        <Editor
          value={board?.contents}
          name="contents"
          headerTemplate={header}
          modules={modules}
          readOnly={true}
          style={{ minHeight: '400px', height: "auto" }}
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
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => goToBoardEdit(Number(index))}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => handleBoardDelete(Number(index))}
          />
          <p className="m-0">
            추천수: {board?.recommendCount == null ? 0 : board?.recommendCount}
          </p>
          <p className="m-0" style={{ marginRight: "2rem" }}>
            작성일: {dateFormatFunc(board?.dateTime)}
          </p>
        </span>
      </div>
      <h2>댓글</h2>
      <BoardComment index={index} />
    </div>
  );
};

export default BoardState;