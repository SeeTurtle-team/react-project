import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Panel } from "primereact/panel";
import { useParams } from "react-router";
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";
import { BoardUpdateDto } from "../interface/BoardUpdateDto";

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
  }, []);

  return (
    <div className="card">
      <Card style={{ marginBottom: "2rem" }}>
        <h3 className="m-0">
          {board?.title}
        </h3>
      </Card>
      <Panel header="Content">
        <p className="m-0">
          {board?.contents}
        </p>
      </Panel>
    </div>
  );
};

export default BoardState;
