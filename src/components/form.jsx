import React from "react";

const Form = ({ id, onSubmit, children }) => {
  return (
    <form id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
