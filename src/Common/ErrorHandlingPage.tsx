import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ErrorHandlingPage = () => {
    const { id } = useParams();
    const [errMsg, setErrMsg] = useState<any>();

    const page429 = () => {
        return(
            <div>
                <h1>현재 서비스 이용이 불가합니다</h1>
                <h1>잠시 후 다시 시도해주세요</h1>
            </div>
        )
    }

    const errStatueCheck = (id:any) =>{
        switch(id){
            case '429':
                setErrMsg(page429);
                break;
        }

    }

    useEffect(() => {
        errStatueCheck(id)
    },[])
    return(
        <div>
            {errMsg}

        </div>
    )
}

export default ErrorHandlingPage;