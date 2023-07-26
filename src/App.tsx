import React, { Suspense, lazy, useContext, useEffect } from "react";
import BoardHeader from "./views/BoardHeader";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

// import BoardCreate from "./views/BoardCreate";
// import BoardEdit from "./views/BoardEdit";
// import BoardList from "./views/BoardList";
// import BoardState from "./views/BoardState";
import Login from "./views/Login";
import UserCreate from "./views/UserCreate";
import ErrorHandlingPage from "./Common/ErrorHandlingPage";
import UserLoginProvider from './context/UserLoginContext';
import ActiveIndexProvider from "./context/ActiveIndexContext";
import FirstPage from "./views/FistPage";
import { ProgressSpinner } from "primereact/progressspinner";
import SmallTalk from "./views/SmallTalk";

const BoardList = lazy(() => import("./views/BoardList"));
const BoardState = lazy(() => import("./views/BoardState"));
const BoardCreate = lazy(() => import("./views/BoardCreate"));
const BoardEdit = lazy(() => import("./views/BoardEdit"));

const App = () => {

  return (
    <div>
      <Suspense fallback={<ProgressSpinner />}>
      <UserLoginProvider>
      <ActiveIndexProvider>
      <BrowserRouter>
        <BoardHeader />
        <Routes>
          <Route path="/" element={<FirstPage/>} />
          <Route path="/BoardCreate" element={<BoardCreate />} />
          <Route path="/BoardEdit/:boardId" element={<BoardEdit />} />  {/**boardId를 넘겨야 게시글을 가져올 수 있겠죠? */}
          <Route path="/BoardList" element={<BoardList />} />
          <Route path="/BoardState/:index" element={<BoardState />} />
          <Route path='/ErrorPage/:id' element={<ErrorHandlingPage/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserCreate" element={<UserCreate />} />

          <Route path='smallTalk' element={<SmallTalk/>}/>
        </Routes>
      </BrowserRouter>
      </ActiveIndexProvider>
      </UserLoginProvider>
      </Suspense>
    </div>
  );
};

export default App;