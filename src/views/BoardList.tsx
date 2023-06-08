import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataView } from "primereact/dataview";

interface board {
  title: string;
  contents: string;
  userId: number;
  recommand: number;
  dateTime: Date;
  boardCategoryId: string;
  nickname: string;
  img: string;
}

const BoardList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [board, setBoard] = useState<board[]>([]);

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
  console.log(board);

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
              <span className="text-2xl font-bold text-800">
                {board.contents}
              </span>
              <div>{board.dateTime.toString()}</div>
              <div>{board.nickname}</div>
              <div>{board.img}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataView value={board} itemTemplate={itemTemplate} paginator rows={5} />
  );
};

export default BoardList;
