import  React, { useState, useImperativeHandle } from "react";

const Toggleable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useImperativeHandle(ref, () => toggleVisibility);

  return (
    <div>
      {
        isVisible
          ? <div>
            {props.children}
            <button onClick={toggleVisibility}>hide</button>
          </div>
          : <div>
            <button onClick={toggleVisibility}>show</button>
          </div>
      }
    </div>
  );
});

Toggleable.displayName = "Toggleable";
export default Toggleable;