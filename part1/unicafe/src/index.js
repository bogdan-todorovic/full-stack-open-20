import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ text }) => <h1>{text}</h1> 

const Button = ({ text, handleEvent }) => (
  <button onClick={handleEvent}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total * 100;

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given.</p>
  }
  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="Total" value={total} />
        <Statistic text="Average" value={average} />
        <Statistic text="Positive" value={positive.toString() + '%'} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <Display text="Give Feedback" />
      <Button text="Good" handleEvent={increaseGood} />
      <Button text="Neutral" handleEvent={increaseNeutral} />
      <Button text="Bad" handleEvent={increaseBad} />

      <Display text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
