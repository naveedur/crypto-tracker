import React from "react";
import { Button } from "react-bootstrap";

const SelectButton = ({ children, selected, onClick }) => {
  const buttonStyle = {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    width: "22%",
  };

  return (
    <Button onClick={onClick} style={buttonStyle}>
      {children}
    </Button>
  );
};

export default SelectButton;
