import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Board } from "../interface/BoardList";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const BoardList = () => {
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState<Board[]>([]);
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const goToBoardCreate = () => {
    navigate("/BoardCreate");
  };

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
    //rowData object 형식으로 받아오는데 object.board_id에서 board_id 부분이 오류
    // state로 보내고 싶은 데이터 id, title, contents
    navigate(`/BoardEdit/${userId}`);
  };
  const boardState = (event:any) => {
    console.log(event.data);
    const index = event.data.board_id;
    navigate(`/BoardState/${index}`);
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

  const actionBodyTemplate = (rowData: Board, props: any) => {
    return (
      <React.Fragment>
        {/* <Button
          label="게시글이동"
          onClick={() => boardState(board[props.rowIndex].board_id)}
          style={{ marginRight: "1rem" }}
        /> */}
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
  const filterSearch = board.filter((Board: any) => {
    return Board.board_title.toLowerCase().includes(inputSearch.toLowerCase());
  });

  return (
    <div className="card">
      <span className="p-input-icon-left" style={{ marginBottom: "1rem" }}>
        <i className="pi pi-search" />
        <InputText
          placeholder="Search"
          onInput={handleSearch}
          value={inputSearch}
        />
      </span>
      <span>
        <Button
          label="Create"
          style={{ marginLeft: "1rem", marginBottom: "1rem" }}
          onClick={goToBoardCreate}
        />
      </span>
      <DataTable
        value={filterSearch}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
        onRowDoubleClick={boardState}
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
