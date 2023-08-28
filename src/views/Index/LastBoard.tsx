import { useEffect, useState } from "react";
//import { LastBoardDto } from "../../interface/lastBoardDto";
import { useNavigate } from "react-router-dom";
import { LastBoardDto } from "../../interface/LastBoardDto";
import axios from "axios";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//최근 업로드 게시판 불러오기
const LastBoard = () => {

    const [board, setBoard] = useState<LastBoardDto[]>([]);
    const navigate = useNavigate();
    axios.defaults.baseURL = "http://localhost:5000";

    useEffect(() => {
        getLastBoardList();
    }, []);


    /**최근 업로드 된 게시글 불러오기 */
    const getLastBoardList = async () => {
        const res = await axios.get("/board/lastBoard");
        setBoard(res.data);
    }

    const legendTemplate = (
        <div className="flex align-items-center text-primary">
            <span className="pi pi-user mr-2"></span>
            <span className="font-bold text-lg">최근 게시글</span>
        </div>
    );

    return (
        <>
            <Fieldset legend={legendTemplate}>
                <DataTable
                    value={board}
                    tableStyle={{ minWidth: "50rem" }}
                    rows={5}
                //onRowClick={boardState}
                >
                    {/* <Column field="id" header="ID"></Column> */}
                    <Column field="title" header="Title"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="nickname" header="Nickname"></Column>
                </DataTable>
            </Fieldset>
        </>
    )

}

export default LastBoard;