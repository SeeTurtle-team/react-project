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
    const [idMessage, setIdMessage] = useState<string>('');
    const [isId, setIsId] = useState<boolean>(false);
    const [password, setPassword] = useState<string>(''); // 숫자+영어+특수문자
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [nameMessage, setNameMessage] = useState<string>('');
    const [isName, setIsName] = useState<boolean>(false);
    const [birth, setBirth] = useState<string>(''); // yyyy-mm-dd 형식
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>(''); // @ 포함
    const [isEmail, setIsEmail] = useState<boolean>(false);
    const [emailMessage, setEmailMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 10) {
            setIdMessage('2글자 이상 10글자 미만으로 입력해주세요.')
            setIsId(false)
          } else {
            setIdMessage('올바른 이름 형식입니다 :)')
            setIsId(true)
          }
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPassword(false)
          } else {
            setPasswordMessage('안전한 비밀번호에요 : )')
            setIsPassword(true)
          }
    }
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.value.length < 4 || e.target.value.length > 5) {
            setNameMessage('4글자 이상 5글자 미만으로 입력해주세요.')
            setIsName(false)
          } else {
            setNameMessage('올바른 이름 형식입니다 :)')
            setIsName(true)
          }
    }
    const handleBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirth(e.target.value);
    }
    const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        setEmail(e.target.value);
        const emailCurrent = e.target.value
        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식을 다시 확인해주세요!')
            setIsEmail(false)
          } else {
            setEmailMessage('올바른 이메일 형식이에요 : )')
            setIsEmail(true)
          }
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
                    <InputText id="userid" keyfilter="alphanum" className="w-full" onInput={handleId} value={id} maxLength={12} />
                    {id.length > 0 && (<span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>)}
                </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                        비번
                    </label>
                    <InputText id="password" keyfilter={/[^s]/} className="w-full" onInput={handlePassword} value={password} type='password' />
                    {password.length > 0 && (<span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}
                </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        이름
                    </label>
                    <InputText id="name" keyfilter="alpha" className="w-full" onInput={handleName} value={name} maxLength={5} />
                    {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                <div className="flex-auto">
                    <label htmlFor="hex" className="font-bold block mb-2">
                        생년월일
                    </label>
                    <InputText id="birth" keyfilter={/^[^<>*!]+$/} className="w-full" onInput={handleBirth} value={birth} type='date'/>
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
                    <InputText id="email" keyfilter={/[^s]/} className="w-full" onInput={handleEmail} value={email} />
                    {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                </div>
            </div>
            <Button 
             label="아이디 생성"
             onClick={handleSubmit}
             disabled={!(isName && isEmail && isPassword)}
            />
        </div>
    );
};

export default CreateUser;