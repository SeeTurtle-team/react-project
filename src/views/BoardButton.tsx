import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const BoardButton = () => {
  const navigate = useNavigate();

  const goToBoardCreate = () => {
    navigate("/BoardCreate");
  };
  const goToBoardEdit = () => {
    navigate("/BoardEdit");
  };
  return (
    <span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button label="Create" onClick={goToBoardCreate} />
      &nbsp;
      <Button label="Edit" severity="warning" raised onClick={goToBoardEdit} />
      &nbsp;
      <Button label="Delete" severity="danger" raised />
    </span>
  );
};

export default BoardButton;
