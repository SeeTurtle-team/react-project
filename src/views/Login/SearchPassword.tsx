import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useState } from 'react';
import { errorHandle } from '../../Common/ErrorHandle';
import { useNavigate } from "react-router-dom"; // Import the useHistory hook

const SearchPassword = () => {
    const [id, setId] = useState<string>("");
    const navigate = useNavigate();
    
    const handleResetPassword = async () => {
        try{
            await axios.post("/user/id", {
                userId: id
            }).then((response) => {
                if (response.data.success === true) {
                    alert('존재하지 않는 아이디 입니다. 다른 아이디를 입력해주세요');
                }
                if (response.data.msg === "아이디 중복") {
                  navigate('/searchPassword/' + id);
                }
            });
        } catch (error: any) {
            console.log(error);
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`);
        }
    };

    return (
        <div>
            <h2>비밀번호 재설정</h2>
            <div className='card'>
                <h2>아이디를 입력해 주세요</h2>
                <div style={{marginBottom: '1rem'}}>
            <InputText
            keyfilter={/[^]/}
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ marginRight: "1rem" }}
          />
          </div>
          <div>
          <Button
            label="다음"
            onClick={handleResetPassword}
            // disabled={!isEmailSendCode}
            style={{ marginRight: "1rem" }}
          />
          </div>
            </div>
        </div>
    );
};

export default SearchPassword;