import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Panel } from "primereact/panel";
import { useParams } from "react-router";
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";
import { BoardUpdateDto } from "../interface/BoardUpdateDto";
import { Button } from "primereact/button";
import { dateFormatFunc } from "../Common/DateFormat";

const BoardState = () => {
  const [board, setBoard] = useState<BoardUpdateDto>();
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
  };



  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBoardLike = async () => {
    console.log(board);
    try {
      axios
        .post("/board/recommend", {
          userId: 5,
          boardId: Number(index),
        })
    console.log(board);
  } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  }


  const boardUpdate = async () => {
    const response = await axios.get("/board/read/" + index);
    setBoard(response.data);
  }

  return (
    <div className="card">
      <Card style={{ marginBottom: "2rem" }} title="Title" >
        <p className="m-0">
          {board?.title}
        </p>
      </Card>


      <Panel header="Content" style={{ marginBottom: "2rem" }}>
        <p className="m-0">
          {board?.contents}
        </p>
      </Panel>

      <span>
        <Button
          icon="pi pi-thumbs-up"
          rounded
          outlined
          className="mr-2"
          onClick={() => handleBoardLike()}
          style={{ marginRight: "1rem" }}
        />
        <p className="m-0">
          추천수: {board?.recommend}
        </p>
        <p className="m-0" style={{ marginRight: "2rem" }}>
          작성일: {dateFormatFunc(board?.dateTime)}
        </p>
      </span>

      <Button label="Update" onClick={boardUpdate}></Button>
    </div>
  );
};

export default BoardState;
