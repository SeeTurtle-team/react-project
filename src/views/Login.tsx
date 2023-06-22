import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook

const Login = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/CreateUser");
  };
  const handleLogin = () => {
    navigate("/");

  }

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
      <Button label="로그인" outlined style={{ marginRight: "2rem" }} onClick={handleLogin}/>
      <Button label="회원가입" outlined onClick={handleCreateUser} />
    </div>
  );
};

export default Login;
