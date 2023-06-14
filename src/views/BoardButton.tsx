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
      <Button label="Create" style={{marginLeft:'1rem' ,marginBottom:'1rem' }} onClick={goToBoardCreate} />
    </span>
  );
};

export default BoardButton;
