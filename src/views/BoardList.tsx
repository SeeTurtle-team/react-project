import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataView } from "primereact/dataview";

/**이런 interface는 나중에 다른 파일에서 재활용할 수 있으니 따로 폴더를 빼서 관리하는게 좋을거 같습니다.
 * 또 중복되는게 있으면 상속해서 사용할 수 도 있고요
 */
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
        setBoard(response.data);  //여기서 서버에서 에러코드가 내려왔을 때 바로 catch 부분으로 가는건가요? 바로 catch 부분으로 가는거면 굳이 밑에 에러가 발생했다는 문구 없이 catch 문 안에서 에러난 후 처리를 해주시면 됩니다
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);
  console.log(board);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;  //단순히 에러가 발생했다는 것만 띄우는 것이 아닌 에러가 난 뒤 처리하는 것이 중요합니다. 한단계 전으로 돌아간다던지 인덱스 페이지로 간다던지 하는거요
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
