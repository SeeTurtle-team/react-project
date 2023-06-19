export const errorHandle = (errCode:number) => {

    switch(errCode){
        case 429:
            alert('과도한 접속으로 이용이 제한 되었습니다. 잠시 후 다시 시도해주세요');
            return 429;
        case 500:
            alert('내부 서버 오류입니다. 잠시 후 다시 시도해주세요');
            return 500;
        case 404:
            alert('사용할 수 없는 URL입니다.');
            return 404;
        case 401:
            alert('권한이 인증되지 않았습니다. 관리자에게 문의하세요');
            return 401;
    }
}

