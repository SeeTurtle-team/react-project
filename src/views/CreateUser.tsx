import React, { useCallback, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook
import { errorHandle } from "../Common/ErrorHandle";
import axios from "axios";
import { number } from "yargs";

const CreateUser = () => {
  const [id, setId] = useState<string>("");
  const [idMessage, setIdMessage] = useState<string>("");
  const [isId, setIsId] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(""); // 숫자+영어+특수문자
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [isName, setIsName] = useState<boolean>(false);
  const [birth, setBirth] = useState<string>(""); // yyyy-mm-dd 형식
  const [nickname, setNickname] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(""); // @ 포함
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [emailCodeMessage, setEmailCodeMessage] = useState<string>("");
  const [isEmailSendCode, setIsEmailSendCode] = useState<boolean>(false);
  const [isEmailCode, setIsEmailCode] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 10) {
      setIdMessage("4글자 이상 10글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("올바른 아이디 형식입니다 :)");
      setIsId(true);
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
  const handlePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // const passwordRegex =
      //     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPasswordCheck(passwordCurrent);
      console.log(password, passwordCurrent);
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
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름 형식입니다 :)");
      setIsName(true);
    }
  };
  const handleBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(e.target.value);
  };
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setNicknameMessage("3글자 이상 8글자 미만으로 입력해주세요.");
      setIsNickname(false);
    } else {
      setNicknameMessage("올바른 닉네임 형식입니다 :)");
      setIsNickname(true);
    }
  };
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
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post("/user/signup", {
          userId: id,
          password: password,
          name: name,
          birth: birth,
          nickname: nickname,
          email: email,
          userLoginType: "d",
          userGradeId: 2,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success === true) {
            alert("회원가입에 성공했습니다. 다시 로그인 해주세요");
            navigate("/Login");
          }
          if (response.data.msg === "아이디 중복") {
            alert(response.data.msg + " 다른 아이디를 입력해주세요!");
            setId("");
          }
          if (response.data.msg === "닉네임 중복") {
            alert(response.data.msg + " 다른 닉네임을 입력해주세요!");
            setNickname("");
          }
          if (response.data.msg === "이메일 중복") {
            alert(response.data.msg + " 다른 이메일을 입력해주세요!");
            setEmail("");
          } else {
            alert(response.data.msg);
            return;
          }
        });
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
    }
  };
  const handleEmailCheck = async () => {
    try {
      await axios.post("/user/resendcode", {
        email: email,
      });
      setIsEmailSendCode(true);
      setEmailCheckMessage("이메일이 발송되었습니다");
    } catch (error: any) {
      console.log(error);
      const errCode = errorHandle(error.response.status);
      navigate(`/ErrorPage/${errCode}`);
      setEmailCheckMessage("에러 발생");
    }
  };
  const handleCodeCheck = () => {
    try{
        axios.post("/user/checkcode",{
            email: email,
            code: emailCode
        }).then((response) => {
            setIsEmailCode(true);
            if(response.data.success === true){
                setEmailCodeMessage("✔")
            } else {
                setEmailCodeMessage("✘")
            }
        })
        console.log("code Checked");
    } catch (error: any) {
        console.log(error);
        const errCode = errorHandle(error.response.status);
        navigate(`/ErrorPage/${errCode}`);
    }
  };

  return (
    <div className="card">
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-auto">
          <label htmlFor="integer" className="font-bold block mb-2">
            아이디
          </label>
          <InputText
            id="userid"
            keyfilter="alphanum"
            className="w-full"
            onInput={handleId}
            value={id}
            maxLength={12}
          />
          {id.length > 0 && (
            <span className={`message ${isId ? "success" : "error"}`}>
              {idMessage}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-auto">
          <label htmlFor="number" className="font-bold block mb-2">
            비밀번호
          </label>
          <InputText
            id="password"
            keyfilter={/[^]/}
            className="w-full"
            onInput={handlePassword}
            value={password}
            type="password"
            maxLength={15}
          />
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-auto">
          <label htmlFor="number" className="font-bold block mb-2">
            비밀번호 확인
          </label>
          <InputText
            id="passwordCheck"
            keyfilter={/[^]/}
            className="w-full"
            onInput={handlePasswordCheck}
            value={passwordCheck}
            type="password"
            maxLength={15}
          />
          {passwordCheck.length > 0 && (
            <span
              className={`message ${isPasswordCheck ? "success" : "error"}`}
            >
              {passwordCheckMessage}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-auto">
          <label htmlFor="integer" className="font-bold block mb-2">
            이름
          </label>
          <InputText
            id="name"
            keyfilter="alpha"
            className="w-full"
            onInput={handleName}
            value={name}
            maxLength={10}
          />
          {name.length > 0 && (
            <span className={`message ${isName ? "success" : "error"}`}>
              {nameMessage}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3" style={{ marginBottom: "1rem" }}>
        <div className="flex-auto">
          <label htmlFor="integer" className="font-bold block mb-2">
            닉네임
          </label>
          <InputText
            id="nickname"
            keyfilter="alphanum"
            className="w-full"
            onInput={handleNickname}
            value={nickname}
            maxLength={10}
          />
          {nickname.length > 0 && (
            <span className={`message ${isNickname ? "success" : "error"}`}>
              {nicknameMessage}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex-auto" style={{ marginBottom: "1rem" }}>
          <label htmlFor="hex" className="font-bold block mb-2">
            생년월일
          </label>
          <InputText
            id="birth"
            keyfilter={/^[^<>*!]+$/}
            className="w-full"
            onInput={handleBirth}
            value={birth}
            type="date"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2" style={{ marginBottom: "1rem" }}>
        <div className="flex-auto">
          <label htmlFor="integer" className="font-bold block mb-2">
            이메일
          </label>
          <span>
            <InputText
              id="email"
              keyfilter={/[^]/}
              onInput={handleEmail}
              value={email}
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
              size={40}
            />
          </span>
          <Button
            label="이메일 인증"
            onClick={handleEmailCheck}
            style={{ marginBottom: "1rem" }}
          />
          <div style={{ marginBottom: "1rem" }}>
          {email.length > 0 && (
            <div
              className={`message ${isEmail ? "success" : "error"}`}
              style={{ marginBottom: "1rem" }}
            >
              {emailMessage}
            </div>
          )}
            {<span
            className={`message ${isEmailSendCode ? "success" : "error"}`}
            style={{ marginBottom: "1rem" }}
          >
            {emailCheckMessage}
          </span>}
          </div>
          <div>
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
          />
          {<span
            className={`message ${isEmailCode ? "success" : "error"}`}
            style={{ marginBottom: "1rem" }}
          >
            {emailCodeMessage}
          </span>}
        </div>
      </div>
      </div>
      <span style={{ marginRight: "1rem" }}>
        <Button
          label="아이디 생성"
          onClick={handleSubmit}
          disabled={!(isId && isPassword && isName && isEmail && isNickname)}
        />
      </span>
    </div>
  );
};

export default CreateUser;
