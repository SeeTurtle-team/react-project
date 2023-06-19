import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const ErrorHandlingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState<any>();

    const page429 = () => {
        return (
            <div>
                <h1>현재 서비스 이용이 불가합니다</h1>
                <h1>잠시 후 다시 시도해주세요</h1>
            </div>
        );
    }

    const page500 = () => {
        return (
            <div>
                <h1>서버에 오류가 발생했습니다</h1>
                <h1>잠시 후 다시 시도해주세요</h1>
            </div>
        );
    }

    const page404 = () => {
        return (
            <div>
                <h1>응답할 수 없는 URL입니다.</h1>
                <Button onClick={() => navigate('/')}>홈</Button>
            </div>
        );
    }

    const page401 = () => {
        window.history.go(-2);
    }

    const errStatueCheck = (id: any) => {
        //에러 발생 시 코드에 따라 case를 추가하시고 위에 함수로 리턴 값을 만들어주시면 됩니다.
        switch (id) {
            case '429':
                setErrMsg(page429);
                break;
            case '500':
                setErrMsg(page500);
                break;
            case '404':
                setErrMsg(page404);
                break;
            case '401':
                setErrMsg(page401);
                break;
        }
    }

    useEffect(() => {
        errStatueCheck(id)
    }, []);

    return (
        <div>
            {errMsg}
        </div>
    )
}

export default ErrorHandlingPage;