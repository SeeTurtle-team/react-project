import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { errorHandle } from '../Common/ErrorHandle';
import Modal from 'react-modal';

import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { BoardCommentDto } from '../interface/BoardCommentDto';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  type Props = {
    index: string;
  }

const BoardComment = ({index}:Props) => {
    const [boardComment, setBoardCommenet] = useState<BoardCommentDto[]>([]);
    const [comment, setComment] = useState<string>("");
    const [boardCommentEdit, setBoardCommentEdit] = useState<string>("");
    const [boardCommentBoolean, setBoardCommentBoolean] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [banReason, setBanReason] = useState<string>("");
    const navigate = useNavigate();
    const userId = 5; // 로그인 후 아이디 값 받아오기


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
            userId: userId,
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
              userId: userId,
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
      const handleCommentBan = (i: number) => {
        setModalIsOpen(!modalIsOpen);
      }
      const handleCommentBanSend = () => {
        try{
            axios.post("/board/notify", {
                reason: banReason,
                boardId: Number(index),
                userId: userId
            })
        } catch (error: any) {
          console.log(error);
          const errCode = errorHandle(error.response.status);
          navigate(`/ErrorPage/${errCode}`);
        }
        setModalIsOpen(false);
      }
      const closeModal = () => {
        setModalIsOpen(false);
      }

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
              style={{ marginRight: "1rem" }}
              onClick={() => handleCommentDelete(i)}
            />
            <Button
              label="신고"
              severity="danger"
              icon="pi pi-ban"
              onClick={() => handleCommentBan(i)}
            />
            <Modal 
            isOpen={modalIsOpen} 
            appElement={document.getElementById('root') as HTMLElement}
            style={customStyles}
            >
            <h2>신고 이유</h2>
            <InputTextarea id="userid" keyfilter="alphanum" style={{width:'12rem', marginBottom: "1rem" }} className="w-full" value={banReason} onChange={(e) => setBanReason(e.target.value)} rows={5} cols={40} />
            <div className="flex flex-wrap justify-content-center gap-5">
            <Button
            label='신고'
            onClick={handleCommentBanSend}
            />
            <Button
            label='취소'
            severity='danger'
            onClick={closeModal}
            />
            </div>
            </Modal>
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