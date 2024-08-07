import { useState } from 'react'

const Display = ({ text }) => (
  <div>
    {text} 
  </div>
)

const Points = ({ points }) => (
  <div>
    has {points} votes
  </div>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const returnRandomNumber = () => Math.floor(Math.random() * anecdotes.length)

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = () => {
    let index = 0
    let mostVotes = 0

    points.forEach((value, i) => {
      if (mostVotes < value) {
        mostVotes = value
        index = i
      }
    })

    return index
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display text={anecdotes[selected]}/>
      <Points points={points[selected]}/>
      <Button text={'vote'} handleClick={vote}/>
      <Button text={'next anecdote'} handleClick={() => setSelected(returnRandomNumber())}/>
      <h1>Anecdote with most votes</h1>
      <Display text={anecdotes[mostVotes()]}/>
      <Points points={points[mostVotes()]}/>
    </div>
  )
}

export default App