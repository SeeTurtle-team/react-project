import React from 'react';
import BoardList from './views/BoardList';
import BoardSearch from './views/BoardSearch';
import BoardButton from './views/BoardButton';


const App = () => {
  return (
    <div>
      <BoardSearch />
      <BoardButton />
      <BoardList />
    </div>
  );
};

export default App;