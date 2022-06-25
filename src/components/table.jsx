import React from "react";

const Table = ({ id, columns = [], data = [] }) => {
  return (
    <table id={id}>
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <td key={index}>{column.name}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <tr key={index}>
                {columns.map((column, index) => {
                  if ("custom" in column) {
                    return <td key={index}>{column.custom(item)}</td>;
                  }
                  if (column.id in item) {
                    return <td key={index}>{item[column.id]}</td>;
                  } else {
                    return <td></td>;
                  }
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
