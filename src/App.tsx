import React, { createContext, useState, Dispatch, SetStateAction } from "react";
import BoardHeader from "./views/BoardHeader";
import { Route, Routes, Navigate } from "react-router";
import BoardCreate from "./views/BoardCreate";
import BoardEdit from "./views/BoardEdit";
import BoardList from "./views/BoardList";
import { BrowserRouter } from "react-router-dom";
import BoardState from "./views/BoardState";
import ErrorHandlingPage from "./Common/ErrorHandlingPage";
import Login from "./views/Login";
import CreateUser from "./views/CreateUser";

import UserLoginProvider, { UserLoginContext } from './context/UserLoginContext';

// interface UserLoginContext {
//   isLogin: boolean | null;
//   setIsLogin: Dispatch<SetStateAction<boolean | null>>;
// }

// export const UserLoginContextDefaultValue:UserLoginContext = {
//   isLogin: false,
//   setIsLogin: () => {}
// }
// const UserLoginContext = createContext<UserLoginContext>(UserLoginContextDefaultValue);



const App = () => {
  const UserLoginContext = React.createContext(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const value = {isLogin, setIsLogin};

  return (
    <div>
      <UserLoginProvider>
      <BrowserRouter>
        <BoardHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/BoardCreate" element={<BoardCreate />} />
          <Route path="/BoardEdit/:boardId" element={<BoardEdit />} />  {/**boardId를 넘겨야 게시글을 가져올 수 있겠죠? */}
          <Route path="/BoardList" element={<BoardList activeIndex={activeIndex} setActiveIndex={setActiveIndex} />} />
          <Route path="/BoardState/:index" element={<BoardState />} />
          <Route path='/ErrorPage/:id' element={<ErrorHandlingPage/>} />
          <Route path="/Login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/CreateUser" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
      </UserLoginProvider>
    </div>
  );
};

export default App;
