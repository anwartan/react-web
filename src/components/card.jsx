import React from "react";

const Card = ({ id, title, footer, children }) => {
  return (
    <section id={id} className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body" style={{ padding: "0px 10px" }}>
        {children}
      </div>
      <div className="card-footer">{footer}</div>
    </section>
  );
};

export default Card;
