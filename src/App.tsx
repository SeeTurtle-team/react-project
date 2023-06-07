import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import { DataView } from "primereact/dataview";
import { Button } from 'primereact/button';

interface board {
  title: string;
  contents: string;
  userId: number;
  recommand: number;
  dateTime: string;
  boardCategoryId: string;
  nickname: string;
  img: string;
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [board, setBoard] = useState<board[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setBoard([]);
        setLoading(true);
        const response = await axios.get("/board");
        setBoard(response.data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);
  console.log(board)

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!board || board.length === 0) return null;

  const itemTemplate = (board: board) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="font-semibold">{board.title}</div>
              <span className="text-2xl font-bold text-800">{board.contents}</span>
              <div>{board.dateTime}</div>
              <div>{board.nickname}</div>
              <div>{board.img}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    console.log(inputSearch);
  }
  


  return (
    <div className="card">
      <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" onInput={handleSearch} value={inputSearch} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>
      <Button label="Create"/>&nbsp;
      <Button label="Edit" severity="warning" raised />&nbsp;
      <Button label="Delete" severity="danger" raised />
      </span>
      <DataView value={board} itemTemplate={itemTemplate} paginator rows={5} />
    </div>
  );
}
