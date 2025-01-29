import { useState } from 'react'

const Button = ({ label, onClickHandler }) => <button onClick={onClickHandler}>{label}</button>

const StatisticLine = ({ label, value, unit }) => <p><b>{label}</b> {value}{unit}</p>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad == 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const all = good + neutral + bad
  const avg = (good * 1 + bad * -1) / (good + bad + neutral)
  const posFrqc = good / (good + neutral + bad) * 100

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine label={"good"} value={good} /> 
      <StatisticLine label={"neutral"} value={neutral} /> 
      <StatisticLine label={"bad"} value={bad} /> 
      <StatisticLine label={"all"} value={all} /> 
      <StatisticLine label={"average"} value={avg} /> 
      <StatisticLine label={"positive"} value={posFrqc} unit={"%"} /> 
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        <Button label={"good"} onClickHandler={() => setGood(good + 1)} />
        <Button label={"neutral"} onClickHandler={() => setNeutral(neutral + 1)} />
        <Button label={"bad"} onClickHandler={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App