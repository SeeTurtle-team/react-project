import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useCallback, useEffect, useState } from "react";
import { errorHandle } from "../../Common/ErrorHandle";
import { useNavigate, useParams } from "react-router-dom"; // Import the useHistory hook

const SearchPasswordReset = () => {
  const [id, setId] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [isEmailSendCode, setIsEmailSendCode] = useState<boolean>(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [isEmailCode, setIsEmailCode] = useState<boolean>(false);
  const [emailCodeMessage, setEmailCodeMessage] = useState<string>("");
  const { paramsId } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    setId(paramsId);
    console.log(paramsId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        .patch("/user/help/pw", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          alert("비밀번호가 변경되었습니다!")
          navigate('/');
        });
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };

  const handlePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리 이상 15 이하로 입력해주세요!"
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호에요 : )");
        setIsPassword(true);
      }
    },
    []
  );

  const handleEmailCheck = async () => {
    try {
      await axios
        .post("/user/help/check", {
          userId: paramsId,
          email: email
        })
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {
            setIsEmailSendCode(true);
            setEmailCheckMessage("이메일이 발송되었습니다");
            alert("이메일이 발송되었습니다");
          }
          if (response.data.success === false) {
            alert(response.data.msg);
          }
        });
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
      setEmailCheckMessage("에러 발생");
    }
  };

  const handlePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // const passwordRegex =
      //     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPasswordCheck(passwordCurrent);
      if (password === passwordCurrent) {
        setPasswordCheckMessage("비밀번호 확인이 완료되었습니다. : )");

        setIsPasswordCheck(true);
      }
      if (password !== passwordCurrent) {
        setPasswordCheckMessage("비밀번호가 같은지 확인해주세요!");
        setIsPasswordCheck(false);
      }
      // else {
      //     setPasswordCheckMessage("비밀번호 확인이 완료되었습니다. : )");
      //     setIsPasswordCheck(true);
      // }
    },
    [password, passwordCheck]
  );

  const handleCodeCheck = () => {
    try{
        axios.post("/user/checkcode",{
            email: email,
            code: emailCode
        }).then((response) => {
            if(response.data.success === true){
                setEmailCodeMessage("✔")
                setIsEmailCode(true);
            } else {
                setEmailCodeMessage("✘")
            }
        })
    } catch (error: any) {
        console.log(error);
        const errCode = errorHandle(error.response.status);
        navigate(`/ErrorPage/${errCode}`);
    }
  };

  return (
    <div>
      <h2>비밀번호 재설정</h2>
      <div className="card">
        <div>
          <InputText
            id="email"
            keyfilter={/[^]/}
            onInput={handleEmail}
            value={email}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
            size={40}
          />
          <span>
            <Button
              label="이메일 인증"
              onClick={handleEmailCheck}
              style={{ marginBottom: "1rem" }}
              disabled={!isEmail}
            />
          </span>
        </div>
        <div style={{marginBottom:'1rem'}}>
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
        <div>
        <InputText
            id="id"
            keyfilter={/[^]/}
            onInput={handleEmail}
            value={id || ""}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
            disabled
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <InputText
              id="password"
              keyfilter={/[^]/}
              onInput={handlePassword}
              value={password}
              type="password"
              size={30}
              maxLength={15}
              placeholder="비밀번호 재설정"
            />
            {password.length > 0 && (
            <span 
            className={`message ${isPassword ? "success" : "error"}`}
            style={{marginLeft:'1rem'}}
            >
              {passwordMessage}
            </span>
          )}
          </div>
          <div>
            <InputText
              id="passwordCheck"
              keyfilter={/[^]/}
              onInput={handlePasswordCheck}
              value={passwordCheck}
              type="password"
              size={30}
              maxLength={15}
              placeholder="비밀번호 재설정 확인"
            />
            {passwordCheck.length > 0 && (
            <span
              className={`message ${isPasswordCheck ? "success" : "error"}`}
              style={{marginLeft:'1rem'}}
            >
              {passwordCheckMessage}
            </span>
          )}
          </div>
        </div>
        <Button
          label="확인"
          onClick={handleEmailDuplicate}
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
          disabled={!(isEmail && isPassword && isPasswordCheck)}
        />
        {
          <span
            className={`message ${isEmail ? "success" : "error"}`}
            style={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            {emailDuplicateCheck}
          </span>
        }
      </div>
    </div>
  );
};

export default SearchPasswordReset;
