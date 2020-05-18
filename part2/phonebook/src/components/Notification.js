import React from 'react';

const Notification = ({ notification }) => {

  const successStyle = {
    border: "3px solid green",
    background: "lawngreen",
    display: "inline-block"
  };

  const errorStyle = {
    border: "3px solid red",
    background: "indianred",
    display: "inline-block"
  };

  if (notification === null) 
    return null;

  if (notification.type === "success") {
    return (
      <div style={successStyle}>
        {notification.message}
      </div>
    );
  }

  if (notification.type === "error") {
    return (
      <div style={errorStyle}>
        {notification.message}
      </div>
    );
  }
};

export default Notification;