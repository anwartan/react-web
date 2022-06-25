import React from "react";

const TextField = ({
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
  helperText,
  maxLength,
}) => {
  if (type === "hidden") {
    return <input type="hidden" id={id} name={id} value={value} />;
  }
  if (type === "checkbox") {
    return (
      <div className="form-control">
        <label>{label}</label>
        <br />
        <input
          type="checkbox"
          id={id}
          name={id}
          onChange={onChange}
          checked={value}
        />
      </div>
    );
  }
  return (
    <div className="form-control">
      {label ? (
        <>
          <label style={{ flex: 1 }}>{label}</label>
          <br />
        </>
      ) : (
        <></>
      )}
      <div style={{ display: "flex", flex: 2, flexDirection: "column" }}>
        <input
          onChange={(e) => {
            if (maxLength === undefined || maxLength === null) {
              onChange(e);
            }

            if (maxLength - e.target.value.length >= 0) {
              onChange(e);
            }
          }}
          type={type}
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
        />
        {helperText ? <p className="helper">{helperText}</p> : <></>}
      </div>
    </div>
  );
};

export default TextField;
