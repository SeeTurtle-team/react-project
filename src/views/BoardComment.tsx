import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { errorHandle } from '../Common/ErrorHandle';
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { BoardCommentDto } from '../interface/BoardComment.Dto';

const BoardComment = ({index}:any) => {
    const [boardComment, setBoardCommenet] = useState<BoardCommentDto[]>([]);
    const [comment, setComment] = useState<string>("");
    const [boardCommentEdit, setBoardCommentEdit] = useState<string>("");
    const [boardCommentBoolean, setBoardCommentBoolean] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
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
        <div>
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

export default BoardComment;