import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { User } from '../interface/UserAddInfo';
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";

const CreateUser = () => {
    const [user, setUser] = useState<User[]>([]);
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirth(e.target.value);
    }
    const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    
    const handleSubmit = async () => {
        try {
            const response = await axios.post("/user/signup", {
                userId: id, 
                password: password, 
                name: name, 
                birth: birth, 
                nickname: nickname, 
                email: email,
                userLoginType: 'd',
                userGradeId: 2
            });
            setUser(response.data);
            navigate("/");
          } catch (error: any) {
            console.log(error);
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`);
            // if(error.response.status ===429){
            //   alert('과도한 접속으로 이용이 제한 되었습니다. 잠시 후 다시 시도해주세요');
            //   navigate('/ErrorPage/'+429);
            // }else{
            //   alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.'); //에러 핸들링 필수!!!!!
            //   navigate(-1); // error 발생 시 이전 page 이동
            // }
          }
    }

    return (
        <div className='card'>
            <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        아이디
                    </label>
                    <InputText id="userid" keyfilter="alphanum" className="w-full" onInput={handleId} value={id} />
                </div>
                <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                        비번
                    </label>
                    <InputText id="password" keyfilter="alphanum" className="w-full" onInput={handlePassword} value={password} />
                </div>
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        이름
                    </label>
                    <InputText id="name" keyfilter="alpha" className="w-full" onInput={handleName} value={name} />
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                <div className="flex-auto">
                    <label htmlFor="hex" className="font-bold block mb-2">
                        생년월일
                    </label>
                    <InputText id="birth" keyfilter="alphanum" className="w-full" onInput={handleBirth} value={birth} />
                </div>
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        닉네임
                    </label>
                    <InputText id="nickname" keyfilter="alphanum" className="w-full" onInput={handleNickname} value={nickname} />
                </div>
                <div className="flex-auto">

                </div>
            </div>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "1rem" }}>
                <div className="flex-auto">
                <label htmlFor="integer" className="font-bold block mb-2">
                        이메일
                    </label>
                    <InputText id="email" keyfilter="alphanum" className="w-full" onInput={handleEmail} value={email} />
                </div>
            </div>
            <Button 
             label="아이디 생성"
             onClick={handleSubmit}
            />
        </div>
    );
};

export default CreateUser;