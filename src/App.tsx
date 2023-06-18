import React from "react";
import BoardHeader from "./views/BoardHeader";
import { Route, Routes } from "react-router";
import BoardCreate from "./views/BoardCreate";
import BoardEdit from "./views/BoardEdit";
import BoardList from "./views/BoardList";
import { BrowserRouter } from "react-router-dom";
import BoardState from "./views/BoardState";
import ErrorHandlingPage from "./Common/ErrorHandlingPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <BoardHeader />
        <Routes>
          <Route path="/BoardCreate" element={<BoardCreate />} />
          <Route path="/BoardEdit/:boardId" element={<BoardEdit />} />  {/**boardId를 넘겨야 게시글을 가져올 수 있겠죠? */}
          <Route path="/BoardList" element={<BoardList />} />
          <Route path="/BoardState" element={<BoardState />} />

          <Route path='/ErrorPage/:id' element={<ErrorHandlingPage/>} />   
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
