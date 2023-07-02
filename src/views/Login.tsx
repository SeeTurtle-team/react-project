import React from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom"; // Import the useHistory hook
import {Image} from 'primereact/image';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";
import { Password } from 'primereact/password';

import kakao from "../kakao_login_small.png"
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    const clientID =`${ process.env.REACT_APP_GOOGLE_LOGIN}`;
    
    const handleCreateUser = () => {
        navigate("/CreateUser");
    };
    const handleLogin = () => {
        navigate("/");

    }
    const loginHandler = () => {
        window.location.href = link;
    };

    //google login
    const googleLogin = async (token?:string) => {
        try{
            const response = axios.post('/user/google',{
                token : token
            });

            console.log(response)
        }catch(err){
            console.log(err)
        }
    }


    //https://stack94.tistory.com/entry/React-%EC%B9%B4%EC%B9%B4%EC%98%A4Kakao-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0
    //카카오 로그인 참조
    const kakaoClientId = 'JavaScript KEY'
    const kakaoOnSuccess = async (data: { response: { access_token: any; }; })=>{
      	console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    }
    const kakaoOnFailure = (error: any) => {
        console.log(error);
    };

    
   
    return (
        <div className="card">
          <div style={{marginLeft:'43rem'}}>
            <div className="flex flex-wrap:wrap">
                  <div className="flex flex-wrap gap-3 mb-4" text-align="center">
                      <label htmlFor="integer" className="font-bold block mb-2">
                          아이디
                      </label>
                      <InputText id="userid" keyfilter="alphanum" style={{width:'12rem'}} className="w-full"/>
                  </div>
              </div>
              <div >
                  <div style={{width:'25rem'}}>
                      <label htmlFor="number" className="font-bold block mb-2">
                          비번
                      </label>
                      <Password keyfilter="alphanum"  style={{width:'25rem'}}/>
                  </div>
              </div>

              <div style={{width:'16rem', marginTop:'0.5rem'}}>
                  <div >
                      <KakaoLogin
                          token={kakaoClientId}
                          onSuccess={kakaoOnSuccess}
                          onFail={kakaoOnFailure}
                          
                      />

                      
                  </div>
                  <div style={{display:'block',marginTop:'0.5rem'}}>
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
              <div style={{marginLeft:'0.75rem'}}>
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
             
          </div>
        </div>
        
    );
};

export default Login;
