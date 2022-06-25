import React from "react";

const Button = ({ label, onClick, type }) => {
  if (type === "danger") {
    return (
      <button className="btn-danger" onClick={onClick}>
        {label}
      </button>
    );
  }
  return (
    <button className="btn-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
