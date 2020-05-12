import React from 'react'

const Total = ({ parts }) => {
  const getTotalExercises = () => {
    return parts.reduce((total, part) => total += part.exercises, 0);
  };

  return (
    <p>Total of {getTotalExercises()} exercises.</p>
  );
};

export default Total;