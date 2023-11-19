import React, { Suspense, lazy, useContext, useEffect } from "react";
import BoardHeader from "./views/Board/BoardHeader";
import { Route, Routes, Navigate } from "react-router";

// import BoardCreate from "./views/BoardCreate";
// import BoardEdit from "./views/BoardEdit";
// import BoardList from "./views/BoardList";
// import BoardState from "./views/BoardState";
import Login from "./views/Login/Login";
import UserCreate from "./views/Login/UserCreate";
import ErrorHandlingPage from "./Common/ErrorHandlingPage";
import UserLoginProvider from './context/UserLoginContext';
import ActiveIndexProvider from "./context/ActiveIndexContext";
import FirstPage from "./views/Index/FistPage";
import { ProgressSpinner } from "primereact/progressspinner";
import EbookCreate from "./views/Ebook/EbookCreate";
import EbookList from "./views/Ebook/EbookList";
import SmallTalk from "./views/SmallTalk/SmallTalk";
import SearchId from "./views/Login/SearchId";
import SearchPassword from "./views/Login/SearchPassword";
import EbookState from "./views/Ebook/EbookState";
import EbookEdit from "./views/Ebook/EbookEdit";
import SearchPasswordReset from "./views/Login/SearchPasswordReset";
import SmallTalkList from "./views/SmallTalk/SmallTalkList";
import QnAList from "./views/QnA/QnAList";
import MyPage from "./views/MyPage/MyPage";

const BoardList = lazy(() => import("./views/Board/BoardList"));
const BoardState = lazy(() => import("./views/Board/BoardState"));
const BoardCreate = lazy(() => import("./views/Board/BoardCreate"));
const BoardEdit = lazy(() => import("./views/Board/BoardEdit"));

const App = () => {

  return (
    <div>
      <Suspense fallback={<ProgressSpinner />}>
      <UserLoginProvider>
      <ActiveIndexProvider>
        <BoardHeader />
        <Routes>
          <Route path="/" element={<FirstPage/>} />
          <Route path="/BoardCreate" element={<BoardCreate />} />
          <Route path="/BoardEdit/:boardId" element={<BoardEdit />} />
          <Route path="/BoardList" element={<BoardList />} />
          <Route path="/BoardState/:index" element={<BoardState />} />
          <Route path='/ErrorPage/:id' element={<ErrorHandlingPage/>} />

          <Route path="/Login" element={<Login />} />
          <Route path="/UserCreate" element={<UserCreate />} />
          <Route path="/SearchId" element={<SearchId />} />
          <Route path="/SearchPassword" element={<SearchPassword />} />
          <Route path="/SearchPassword/:paramsId" element={<SearchPasswordReset />} />

          <Route path="/EbookList" element={<EbookList />} />
          <Route path="/EbookCreate" element={<EbookCreate />} />
          <Route path="/EbookState/:id" element={<EbookState />} />
          <Route path="/EbookEdit/:ebookId" element={<EbookEdit />} />

	        <Route path='/smallTalk/:roomId' element={<SmallTalk/>} />
          <Route path='/smallTalkList' element={<SmallTalkList/>}/>

          <Route path='/QnAList' element={<QnAList/>}/>

          <Route path='/MyPage' element={<MyPage />} />
        </Routes>
      </ActiveIndexProvider>
      </UserLoginProvider>
      </Suspense>
    </div>
  );
};

export default App;