import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { Image } from 'primereact/image';
import kakao from "../kakao_login_small.png"
const Login = () => {
  const navigate = useNavigate();
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleCreateUser = () => {
    navigate("/CreateUser");
  };
  const handleLogin = () => {
    navigate("/");

  }
  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div className="card">
      <div className="flex flex-wrap:wrap">
        <div className="flex flex-wrap gap-3 mb-4" text-align="center">
          <label htmlFor="integer" className="font-bold block mb-2">
            아이디
          </label>
          <InputText id="userid" keyfilter="alphanum" className="w-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        <div className="flex flex-wrap gap-3 mb-4">
          <label htmlFor="number" className="font-bold block mb-2">
            비번
          </label>
          <InputText id="password" keyfilter="alphanum" className="w-full" />
        </div>
      </div>
        <div className="flex flex-wrap gap-1 mb-2">
        <div className="flex flex-wrap gap-3 mb-4">
                <Button type='button' onClick={loginHandler} >
                <Image src={kakao} alt="Image" width="60" height="40"  />
                </Button>
            </div>
        </div>
      <Button label="로그인" outlined style={{ marginRight: "2rem" }} onClick={handleLogin}/>
      <Button label="회원가입" outlined onClick={handleCreateUser} />
    </div>
  );
};

export default Login;
