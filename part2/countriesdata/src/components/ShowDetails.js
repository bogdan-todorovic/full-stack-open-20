import React, { useState } from "react";

import DisplayCountry from "./DisplayCountry"

const ShowDetails = ({ country }) => {
  const [isShown, setIsShown] = useState(false);

  if (isShown) {
    return (
      <>
        <button onClick={() => setIsShown(!isShown)}>hide</button>
        <DisplayCountry country={country} />
      </>
    );
  }
  return (
    <button onClick={() => setIsShown(!isShown)}>show</button>
  );
};

export default ShowDetails;