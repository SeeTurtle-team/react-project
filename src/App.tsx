import React from "react";
import BoardSearch from "./views/BoardSearch";
import BoardButton from "./views/BoardButton";
import BoardHeader from "./views/BoardHeader";
import { Route, Routes } from "react-router";
import BoardCreate from "./views/BoardCreate";
import BoardEdit from "./views/BoardEdit";
import BoardList from "./views/BoardList";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <BoardHeader />
        <Routes>
          <Route path="/BoardCreate" element={<BoardCreate />} />
          <Route path="/BoardEdit/:userId" element={<BoardEdit />} />
          <Route path="/BoardList" element={<BoardList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
