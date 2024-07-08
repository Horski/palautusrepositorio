import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
    )

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, calculateAverage, calculatePositive }) => {
  const total = good + neutral + bad

  
  if (total === 0) {
    
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={total} />
            <StatisticLine text='average' value={calculateAverage()} />
            <StatisticLine text='positive' value={calculatePositive()} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // calculating the average
  const calculateAverage = () => {
    const total = (good + neutral + bad)
    // if the total is 0, return a string 0%
    if (total === 0) {
      return '0%'
    // else return the percentage
    } else {
      return (((good * 1) + (neutral * 0) + (bad * -1)) / total)
    }
  }
    
    
  
  // calculating the positive amount
  const calculatePositive = () => {
    const total = (good + neutral + bad)
    // if the total is 0, return a string 0%
    if (total === 0) {
      return '0%'
    // else return the percentage with an added % at the end
    } else {
      return `${((good / total) * 100)} %`;
    }
  }

  return (
    <div>
      {/* otsikko */}
      <h1>give feedback</h1>

      {/* napit */}
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>

      {/* statistiikka */}
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        calculateAverage={calculateAverage}
        calculatePositive={calculatePositive}
      />
    </div>
  )
}

export default App