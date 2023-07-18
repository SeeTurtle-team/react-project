import axios from "axios";
import React, { useEffect, useState } from "react";
import { errorHandle } from "../Common/ErrorHandle";
import Modal from "react-modal";

import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

import { BoardCommentDto } from "../interface/BoardCommentDto";
import { dateFormatFunc } from "../Common/DateFormat";
import { useCookies } from "react-cookie";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  index: string | undefined;
};

const BoardComment = ({ index }: Props) => {
  const [boardComment, setBoardCommenet] = useState<BoardCommentDto[]>([]);
  const [comment, setComment] = useState<string>("");
  const [boardCommentEdit, setBoardCommentEdit] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [banReason, setBanReason] = useState<string>("");
  const [isBoardComment, setIsBoardComment] = useState<boolean>(false);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();
  const [isSelectedCommentIndex, setIsSelectedCommentIndex] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const accessToken = cookies.id;
  const headers = {Authorization:'Bearer '+accessToken}
  const navigate = useNavigate();
  // const userId = 5; // 로그인 후 아이디 값 받아오기

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/board/comment/" + index, {headers});
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
      axios
        .post("/board/comment/create", {
          contents: comment,
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
      setComment("");
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };
  const handleCommentEdit = (i: number) => {
    setSelectedCommentIndex(i);
    setIsBoardComment(!isBoardComment);
    if(selectedCommentIndex !== i && selectedCommentIndex !== undefined){
        setIsBoardComment(true);
        console.log("isBoardComment is true");
        setBoardCommentEdit("");
    } else if (isBoardComment) {
      try {
        axios.patch("/board/comment/update", {
          id: boardComment[i].boardComment_id,
          contents: boardCommentEdit,
          boardId: Number(index),
        },{headers}).then((response) => {
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
      setBoardCommentEdit("");
      setSelectedCommentIndex(undefined);
      setIsBoardComment(false);
    } 
  };
  const handleCommentDelete = (i: number) => {
    try {
      axios.delete("/board/comment/delete", {
        headers: headers,
        data: {
          id: boardComment[i].boardComment_id,
        },
      }).then((response) => {
        if(response.data.success === true){
          fetchUsers();
          alert("댓글이 삭제 되었습니다.");
        }
      });
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  const handleCommentBan = (i: number) => {
    setModalIsOpen(!modalIsOpen);
    setBanReason("");
  };
  const handleCommentBanSend = () => {
    try {
      axios.post("/board/notify", {
        reason: banReason,
        boardId: Number(index),
      },{headers});
      alert("신고가 완료되었습니다!");
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
    setModalIsOpen(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {boardComment.map((comment, i) => (
        <Fieldset key={i}>
          <div style={{ marginBottom: "1rem" }}>
            <Fieldset legend={comment.user_nickname}>
              <p className="m-0">
                {(selectedCommentIndex !== i) ? (
                  comment.boardComment_contents
                ) : (
                  <InputText
                    value={boardCommentEdit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBoardCommentEdit(e.target.value)
                    }
                    onKeyDown={handleInputEnter}
                    placeholder={boardComment[i].boardComment_contents}
                  />
                )}
              </p>
            </Fieldset>

            <span
              className="to-right"
              style={{ marginTop: "0.25rem", marginLeft: "91%" }}
            >
              작성일:{dateFormatFunc(comment.boardComment_dateTime)}
            </span>
          </div>
          <div className="to-right" style={{ marginLeft: "83%" }}>
            <Button
              label="수정"
              severity="warning"
              icon="pi pi-pencil"
              style={{ marginRight: "0.5rem", height: "2.5rem" }}
              onClick={() => handleCommentEdit(i)}
            />
            <Button
              label="삭제"
              severity="danger"
              icon="pi pi-trash"
              style={{ marginRight: "0.5rem", height: "2.5rem" }}
              onClick={() => handleCommentDelete(i)}
            />
            <Button
              label="신고"
              severity="danger"
              icon="pi pi-ban"
              style={{ marginRight: "0.5rem", height: "2.5rem" }}
              onClick={() => handleCommentBan(i)}
            />
            <Modal
              isOpen={modalIsOpen}
              appElement={document.getElementById("root") as HTMLElement}
              style={customStyles}
            >
              <h2>신고 이유</h2>
              <InputTextarea
                id="userid"
                keyfilter={/[^]/}
                style={{ width: "12rem", marginBottom: "1rem" }}
                className="w-full"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={5}
                cols={40}
              />
              <div className="flex flex-wrap justify-content-center gap-5">
                <Button label="신고" onClick={handleCommentBanSend} />
                <Button label="취소" severity="danger" onClick={closeModal} />
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
