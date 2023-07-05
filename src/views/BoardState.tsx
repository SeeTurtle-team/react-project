import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Panel } from "primereact/panel";
import { useParams } from "react-router";
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";
import { BoardUpdateDto } from "../interface/BoardUpdateDto";
import { BoardCommentDto } from "../interface/BoardComment.Dto";
import { Button } from "primereact/button";
import { dateFormatFunc } from "../Common/DateFormat";
import { InputTextarea } from "primereact/inputtextarea";
import { Fieldset } from "primereact/fieldset";
import { kMaxLength } from "buffer";
import { InputText } from "primereact/inputtext";
const BoardState = () => {
  const [board, setBoard] = useState<BoardUpdateDto>();
  const [boardComment, setBoardCommenet] = useState<BoardCommentDto[]>([]);
  const [comment, setComment] = useState<string>("");
  const [boardCommentEdit, setBoardCommentEdit] = useState<string>("");
  const [boardCommentBoolean, setBoardCommentBoolean] = useState<boolean>(false);
  const { index } = useParams();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/board/read/" + index);
      setBoard(response.data);
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
    try {
      const response = await axios.get("/board/comment/" + index);
      setBoardCommenet(response.data);
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

  console.log(boardComment);

  const handleBoardLike = async () => {
    try {
      axios.post("/board/recommend", {
        userId: 5,
        boardId: Number(index),
      });
      fetchUsers();
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  const boardUpdate = async () => {
    fetchUsers();
  };


  const handleSubmit = () => {
    try {
      axios.post("/board/comment/create", {
        contents: comment,
        userId: 5,
        boardId: Number(index),
      });
      setComment("");
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };


  const handleCommentEdit = (i: number) => {
    if (boardComment[i].boardComment_isDeleted) {
      try{
        axios.patch("/board/comment/update",{
          id: boardComment[i].boardComment_id,
          contents: boardCommentEdit,
          userId: 5,
          boardId: Number(index)
        })
      } catch (error: any) {
        console.log(error);
        const errCode = errorHandle(error.response.status);
        navigate(`/ErrorPage/${errCode}`);
      }
      setBoardCommentEdit("");
      boardComment[i].boardComment_isDeleted = false;
    } else {
      boardComment[i].boardComment_isDeleted = true;
    }
    setBoardCommentBoolean(!boardCommentBoolean);
  };


  const handleCommentDelete = (i: number) => {
    const userId = 5; // 로그인 후 아이디 값 받아오기
    try {
      axios.delete("/board/comment/delete", {
        data: {
          id: boardComment[i].boardComment_id,
          userId: userId,
        },
      });
      if (userId === boardComment[i].userId) {
        alert("댓글이 삭제 되었습니다.");
      } else {
        alert("댓글 작성자만 삭제할 수 있습니다.");
      }
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };


  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {

  };

  return (
    <div className="card">
      <Card style={{ marginBottom: "2rem" }} title="Title">
        <p className="m-0">{board?.title}</p>
      </Card>

      <Panel header="Content" style={{ marginBottom: "2rem" }}>
        <p className="m-0">{board?.contents}</p>
      </Panel>
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
          <p className="m-0">추천수: {board?.recommendCount==null? 0 : board?.recommendCount}</p>
          <p className="m-0" style={{ marginRight: "2rem" }}>
            작성일: {dateFormatFunc(board?.dateTime)}
          </p>
        </span>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Button label="Update" onClick={boardUpdate}></Button>
      </div>
      {boardComment.map((comment, i) => (
        <Fieldset key={i}>
          <div style={{ marginBottom: "1rem" }}>
            아이디:{comment.user_nickname} <br />
            내용:
            {boardComment[i].boardComment_isDeleted === false ? (
              comment.boardComment_contents
            ) : (
              <InputText 
                value={boardCommentEdit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoardCommentEdit(e.target.value)}
                onKeyDown={handleInputEnter}
                placeholder={boardComment[i].boardComment_contents}
              />
            )}
            <br />
            작성일:{String(comment.boardComment_dateTime)}
          </div>
          <div>
            <Button
              label="수정"
              severity="warning"
              icon="pi pi-pencil"
              style={{ marginRight: "1rem" }}
              onClick={() => handleCommentEdit(i)}
            />
            <Button
              label="삭제"
              severity="danger"
              icon="pi pi-trash"
              onClick={() => handleCommentDelete(i)}
            />
          </div>
        </Fieldset>
      ))}
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ marginRight: "1rem" }}>
          <InputTextarea
            rows={3}
            cols={50}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </span>
        <span>
          <Button label="댓글 작성" onClick={handleSubmit} />
        </span>
      </div>
    </div>
  );
};

export default BoardState;
