import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Board } from "../interface/BoardList";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BoardHeader from "./BoardHeader";
import BoardSearch from "./BoardSearch";
import BoardButton from "./BoardButton";

const BoardList = () => {
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState<Board[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setBoard([]);
        setLoading(true);
        const response = await axios.get("/board");
        setBoard(response.data);
      } catch (error: any) {
        navigate(-1); // error 발생 시 이전 page 이동
      }
      setLoading(false);
    };

    fetchUsers();
  }, [navigate]);

  if (loading)
    return (
      <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  const goToBoardEdit = (userId: number) => {
    console.log(userId);
    //rowData object 형식으로 받아오는데 object.board_id에서 board_id 부분이 오류
    // state로 보내고 싶은 데이터 id, title, contents
    navigate(`/BoardEdit/${userId}`);
  };
  const handleBoardDelete = async (index: number) => {
    axios.delete("/board/delete", {
      data: {
        id: index,
        userId: 5,
      },
      // 로그인 기능 생성시 userId user 값 받아서 값 변경해 주기
    });
    const response = await axios.get("/board");
    setBoard(response.data);
  };

  const actionBodyTemplate = (rowData: Board) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => goToBoardEdit(rowData.board_id)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleBoardDelete(rowData.board_id)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="card">
      <BoardSearch />
      <BoardButton />
      <DataTable
        value={board}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
      >
        <Column field="board_id" header="ID"></Column>
        <Column field="board_title" header="Title"></Column>
        <Column field="board_dateTime" header="Time"></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default BoardList;
