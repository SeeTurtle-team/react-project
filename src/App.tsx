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
import ActiveIndexProvider, {ActiveIndexContext} from "./context/ActiveIndex";




const App = () => {
  // const UserLoginContext = React.createContext(false);
  // const ActiveIndexContext = React.createContext(0);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const value = {isLogin, setIsLogin};

  return (
    <div>
      <UserLoginProvider>
      <BrowserRouter>
        <BoardHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/BoardCreate" element={<BoardCreate />} />
          <Route path="/BoardEdit/:boardId" element={<BoardEdit />} />  {/**boardId를 넘겨야 게시글을 가져올 수 있겠죠? */}
          <Route path="/BoardList" element={<BoardList />} />
          <Route path="/BoardState/:index" element={<BoardState />} />
          <Route path='/ErrorPage/:id' element={<ErrorHandlingPage/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateUser" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
      </UserLoginProvider>
    </div>
  );
};

export default App;
