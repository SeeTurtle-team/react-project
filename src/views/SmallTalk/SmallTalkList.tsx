import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SmallTalkSubDto } from "../../interface/SmallTalkSub.Dto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { errorHandle } from "../../Common/ErrorHandle";
import { useCookies } from "react-cookie";
import axios from "axios";

const SmallTalkList = () => {
    const [smallTalkSub, setSmallTalkSub] = useState<SmallTalkSubDto[]>([]);
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["id"]);
    const accessToken = cookies.id;
    const headers = { Authorization: 'Bearer ' + accessToken }

    const getSmallSubList = async () => {
        try {
            const res = await axios.get("/small-talk/getAllList",{headers});
            setSmallTalkSub(res.data);
            
        } catch (error: any) {
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`); // error 발생 시 이전 page 이동
        }
    }

    useEffect(()=>{
        getSmallSubList();
    },[]);

    return (
        <div className="card">
            <div>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        placeholder="Search"
                    //onInput={handleSearch}
                    //value={inputSearch}
                    />
                </span>
                <span style={{ marginLeft: '1rem' }}>
                    <Button
                        label="검색"
                    //onClick={handleSearchButton}
                    />
                </span>
            </div>

            <div>
                <button onClick={() => console.log(smallTalkSub)}>test</button>
            </div>
        </div>
    )
}

export default SmallTalkList;