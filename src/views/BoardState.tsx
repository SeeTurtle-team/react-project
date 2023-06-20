import React, { useEffect, useState } from "react";
import { Board } from "../interface/BoardList";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Panel } from "primereact/panel";
import { useParams } from "react-router";
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";
import { render } from "react-dom";

const BoardState = () => {
  const [head, setHead] = useState<string>("title");
  const [body, setBody] = useState<string>("body");
  const [board, setBoard] = useState<Board[]>([]);
  const { index } = useParams();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setBoard([]);
      const response = await axios.get("/board/read/" + index);
      setBoard(response.data);
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
      // if(error.response.status ===429){
      //   alert('과도한 접속으로 이용이 제한 되었습니다. 잠시 후 다시 시도해주세요');
      //   navigate('/ErrorPage/'+429);
      // }else{
      //   alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.'); //에러 핸들링 필수!!!!!
      //   navigate(-1); // error 발생 시 이전 page 이동
      // }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card">
      <Card style={{ marginBottom: "2rem" }}>
        <h3 className="m-0">
          {board.length !== 0 ? board[0].board_title : null}
        </h3>
      </Card>
      <Panel header="Content">
        <p className="m-0">
          {board.length !== 0 ? board[0].board_contents : null}
        </p>
      </Panel>
    </div>
  );
};

export default BoardState;
