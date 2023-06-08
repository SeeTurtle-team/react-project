import React from "react";
import BoardList from "./views/BoardList";
import BoardSearch from "./views/BoardSearch";
import BoardButton from "./views/BoardButton";
import BoardHeader from "./views/BoardHeader";

const App = () => {
  return (
    <div>
      <BoardHeader />
      <br />
      <BoardSearch />
      <BoardButton />
      <BoardList />
    </div>
  );
};

export default App;
