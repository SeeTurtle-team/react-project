import React, { useContext, useEffect, useState } from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom"; // Import the useHistory hook
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";
import { Password } from 'primereact/password';

import axios from "axios";
import { errorHandle } from "../Common/ErrorHandle";
import { UserLoginContext } from "../context/UserLoginContext"
import "../css/Login.css";
import { ActiveIndexContext } from "../context/ActiveIndexContext";
import { ActiveIndexContextProviderProps, UserLoginContextProviderProps } from "../interface/UseContextDTO";
import { useCookies } from "react-cookie";

const Login = () => {
    const navigate = useNavigate();
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const clientID =`${ process.env.REACT_APP_GOOGLE_LOGIN}`;

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["id"]);
    const {isLogin, setIsLogin}:UserLoginContextProviderProps = useContext(UserLoginContext);
    const {activeIndex, setActiveIndex}:ActiveIndexContextProviderProps = useContext(ActiveIndexContext);
    
    useEffect(() => {
        setActiveIndex(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleCreateUser = () => {
        navigate("/CreateUser");
    };
    const handleLogin = () => {
        try{
            axios.post("/auth",{
                userId: id,
                password: password
            }).then(response => {
                console.log(response);
                const accessToken = response.data.jwtToken.access_token;
                if(response.data.jwtToken.access_token !== undefined){
                    setCookie("id", accessToken
                    // , {
                    //     httpOnly: true,
                    //     secure: true
                    // }
                    );    
                    // axios.defaults.baseURL = 'http://localhost:3000'
                    // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}` ;
                    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                    console.log(axios.defaults.headers.common.Authorization);
                    alert('로그인에 성공했습니다');
                    setActiveIndex(0);
                    setIsLogin(true);
                    navigate("/");
                }
                if(response.data.msg === "존재하지 않는 아이디입니다."){
                  alert(response.data.msg);
                  setId("");
                  setPassword("");
                  navigate("/Login");
                  return;
                } 
                if(response.data.msg === "비밀번호가 일치하지 않습니다."){
                    alert(response.data.msg);
                    setPassword("");
                    navigate("/Login");
                    return;
                  } 
              });
        } catch (error: any) {
            console.log(error);
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`);
          }
          console.log(cookies);
    }
    const loginHandler = () => {
        window.location.href = link;
    };

    //google login
    const googleLogin = async (token?:string) => {
        try{
            const response = await axios.post('/user/google',{
                token : token
            });

            console.log(response.data.access_token)
        }catch(error:any){
            console.log(error)
            const errCode = errorHandle(error.response.status);
            navigate(`/ErrorPage/${errCode}`);
        }
    }


    //https://stack94.tistory.com/entry/React-%EC%B9%B4%EC%B9%B4%EC%98%A4Kakao-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0
    //카카오 로그인 참조
    const kakaoClientId = `${process.env.REACT_APP_REST_API_KEY}`
    const kakaoOnSuccess = async (data: { response: { access_token: any; }; })=>{
      	console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달

        const response = await axios.post("/user/kakao",{
            idToken:idToken
        })
    }
    
    const kakaoOnFailure = (error: any) => {
        console.log(error);
    };
    
    const code = new URL(window.location.href).searchParams.get("code");
    

    const test = async () => {
        window.location.href=link
        console.log(code)
        const response = await axios.post("/user/kakao",{
            idToken:code
        })
    }

    
   
    return (
        <div className="card">
          <div className="login-box">
            <div>
                  <div className="login-box-id">
                      <InputText id="userid" keyfilter="alphanum" style={{width:'12rem'}} className="w-full" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                  </div>
              </div>
              <div >
                  <div className="login-box-pw">
                      <Password keyfilter={/[^s]/}  style={{width:'25rem'}} value={password} onChange={(e) => setPassword(e.target.value)} maxLength={15} placeholder="PASSWORD" />
                  </div>
              </div>
              <div className="login-box-content">
                <Button
                    label="로그인"
                    outlined 
                    style={{
                        marginRight: "2rem",
                        marginTop:'0.5rem'
                    }}
                    onClick={handleLogin}/>
                <Button label="회원가입" outlined onClick={handleCreateUser}/>
              </div>
              <div className="login-box-content">
                  <div >
                      {/* <KakaoLogin
                          token={kakaoClientId}
                          onSuccess={kakaoOnSuccess}
                          onFail={kakaoOnFailure}
                          
                      /> */}
                    <button onClick={test}>테스트</button>
                      
                  </div>
                  <div className="login-box-content" style={{display:'block',marginTop:'0.5rem'}}>
                  {/* 구글 로그인 참조 블로그
                  https://stack94.tistory.com/entry/React-%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8Google-Login-%EB%A6%AC%EC%95%A1%ED%8A%B8React%EC%97%90%EC%84%9C-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90 */}
                    <GoogleOAuthProvider clientId={clientID}>
                        <GoogleLogin
                            onSuccess={(res) => {
                                console.log(res)
                                googleLogin(res.credential)
                            }}
                            
                        />
                      </GoogleOAuthProvider>
                  </div>

                  <div>
                    
                  </div>
              </div>
          </div>
        </div>
        
    );
};

export default Login;