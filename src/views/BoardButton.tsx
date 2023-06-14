import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const BoardButton = () => {
  const navigate = useNavigate();

  const goToBoardCreate = () => {
    navigate("/BoardCreate");
  };
  
  return (
    <span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button label="Create" onClick={goToBoardCreate} />
    </span>
  );
};

export default BoardButton;
