import { useEffect, useState } from "react";
//import { LastBoardDto } from "../../interface/lastBoardDto";
import { useNavigate } from "react-router-dom";
import { LastBoardDto } from "../../interface/LastBoardDto";
import axios from "axios";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { errorHandle } from "../../Common/ErrorHandle";

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
        try{
            const res = await axios.get("/board/lastBoard");
            setBoard(res.data);
        }catch(error:any){
            console.log(error);
            // console.log(error.response.status)
            const errCode = error.message ==='Network Error' ? '503' : errorHandle(error.response.status);
            
            navigate(`/ErrorPage/${errCode}`); //

        }
        
    }

    const legendTemplate = (
        <div className="flex align-items-center text-primary">
            <span className="pi pi-fw pi-calendar"></span>
            <span className="font-bold text-lg">최근 게시글</span>
        </div>
    );
 
    const boardState = (event: any) => {
        console.log(event.data);
        const index = event.data.id;
        navigate(`/BoardState/${index}`);
    };

    return (
        <div style={{display:'inline-flex',width:'80%'}}>
            <Fieldset legend={legendTemplate} style={{width:'50%'}}>
                <DataTable
                    value={board}
                    tableStyle={{ minWidth: "50%" }}
                    rows={5}
                    resizableColumns columnResizeMode="fit"
                    onRowClick={boardState}
                    style={{display:'inline-flex'}}
                    showGridlines
                    //virtualScrollerOptions={{ itemSize: 26 }}
                    scrollable
                >
                    {/* <Column field="id" header="ID"></Column> */}
                    <Column field="title" header="Title"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="nickname" header="Nickname"></Column>
                    <Column field="dateTime" header="Date"></Column>

                </DataTable>
            </Fieldset>
        </div>
    )

}

export default LastBoard;