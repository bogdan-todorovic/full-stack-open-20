import React from "react";

const Notification = ({ message }) => {
  const style = {
    border: "3px solid blue",
    background: "lightblue",
    display: "inline-block"
  };

  if (message === "")
    return null;

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;