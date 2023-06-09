import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataView } from "primereact/dataview";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { board } from "../interface/BoardList";
import { ProgressSpinner } from "primereact/progressspinner";

const BoardList = () => {
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState<board[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setBoard([]);
        setLoading(true);
        const response = await axios.get("/board");
        setBoard(response.data);
      } catch (error: any) {
        navigate(-1);
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

  const itemTemplate = (board: board) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="font-semibold">{board.board_title}</div>
              <span className="text-2xl font-bold text-800">
                {board.user_nickname}
              </span>
              <div>{board.board_dateTime.toString()}</div>
              <div>{board.board_recommand}</div>
              {/* <div>{board.img}</div> */}
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
