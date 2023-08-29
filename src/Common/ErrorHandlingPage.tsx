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

    const page400 = () => {
        return (
            <div>
                <h1>잘못된 요청입니다</h1>
                <h1>다시 시도해주세요</h1>
            </div>
        );
    }

    const page401 = () => {
        // window.history.go(-2);
        navigate('/');
    }

    const undefinedUrl = () => {
        alert('알 수 없는 에러가 발생했습니다')
        // window.history.go(-2);
        navigate('/');
    }
    
    const page408 = () => {
        return (
            <div>
                <h1>응답시간 제한을 초과했습니다</h1>
                <h1>다시 시도해주세요</h1>
            </div>
        )
    }

    const page503 = () => {
        return (
            <div>
                <h1>죄송합니다. 서버에 문제가 발생했습니다</h1>
                <h1>빠른 시일내에 문제를 해결하도록 하겠습니다.</h1>
            </div>
        )
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
            case '400':
                setErrMsg(page400);
                break;
            case '401.1':
                setErrMsg(page401);
                break;
            case 'undefined' :
                setErrMsg(undefinedUrl);
                break;
            case '408':
                setErrMsg(page408);
                break;
            case '503':
                setErrMsg(page503);
                break;
        }
    }

    useEffect(() => {
        errStatueCheck(id)
    }, []);

    return (
        <div className="card">
            {errMsg}
        </div>
    )
}

export default ErrorHandlingPage;