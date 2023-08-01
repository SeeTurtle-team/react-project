import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { errorHandle } from "../../Common/ErrorHandle";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook

const SearchId = () => {
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [idFind, setIdFind] = useState<string>("");
  const [isIdFind, setIsIdFind] = useState<boolean>(false);
  // const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");
  const [isEmailSendCode, setIsEmailSendCode] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string>("");
  const [isEmailCode, setIsEmailCode] = useState<boolean>(false);
  const [emailCodeMessage, setEmailCodeMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(e.target.value);
    const emailCurrent = e.target.value;
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식을 다시 확인해주세요!");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
    console.log(email);
  };

  const handleEmailDuplicate = async () => {
    try {
      await axios
        .post("/user/help/id", {
          email: email,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success === false) {
            setIsIdFind(false);
            setIdFind(response.data.msg);
          } else {
            setIsIdFind(true);
            setIsEmail(false);
            setIdFind(response.data.userId);
          }
        });
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  const searchPassword = () => {
    navigate("/searchPassword");
  };

  const handleEmailCheck = async () => {
    try {
      await axios
        .post("/user/sendcode", {
          email: email,
        })
        .then((response) => {
          if (response.data.success === true) {
            setIsEmailSendCode(true);
            setEmailCheckMessage("이메일이 발송되었습니다");
            alert("이메일이 발송되었습니다");
          }
          if (response.data.success === false) {
            alert(response.data.error);
          }
        });
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
      setEmailCheckMessage("에러 발생");
    }
  };

  const handleCodeCheck = () => {
    try {
      axios
        .post("/user/checkcode", {
          email: email,
          code: emailCode,
        })
        .then((response) => {
          if (response.data.success === true) {
            setEmailCodeMessage("✔");
            setIsEmailCode(true);
          } else {
            setEmailCodeMessage("✘");
            setIsEmailCode(false);
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
      <h2>아이디 찾기</h2>
      <div className="card">
        <InputText
          id="email"
          keyfilter={/[^]/}
          onInput={handleEmail}
          value={email}
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
          size={40}
        />
        <Button
          label="이메일 인증"
          onClick={handleEmailCheck}
          style={{ marginBottom: "1rem" }}
          disabled={!isEmail}
        />
        {
          <div
            className={`message ${isEmail ? "success" : "error"}`}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            {emailMessage}
          </div>
        }
        <div style={{marginBottom: '1rem'}}>
          <InputText
            keyfilter="num"
            placeholder="인증코드"
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            style={{ marginRight: "1rem" }}
            maxLength={6}
            size={8}
          />
          <Button
            label="코드 확인"
            onClick={handleCodeCheck}
            style={{ marginRight: "1rem" }}
            disabled={!isEmailSendCode}
          />
                    {<span
            className={`message ${isEmailCode ? "success" : "error"}`}
            style={{ marginBottom: "1rem" }}
          >
            {emailCodeMessage}
          </span>}
        </div>
        {isIdFind ? (
          <div
            className={`message ${isIdFind ? "success" : "error"}`}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            아이디: {idFind}
          </div>
        ) : (
          <div
            className={`message ${isIdFind ? "success" : "error"}`}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            {idFind}
          </div>
        )}
        <Button
          label="확인"
          onClick={handleEmailDuplicate}
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
          disabled={!(isEmailCode)}
        />
      </div>
      <div>
        <Button onClick={searchPassword}>비밀번호 찾기</Button>
      </div>
    </div>
  );
};

export default SearchId;
