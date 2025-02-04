import { useState } from 'react'

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const MostVoted = ({ anecdotes, votes }) => {
  const mostVotedIndex = votes.reduce((accumulator, val, i, arr) => val > arr[accumulator] ? i : accumulator, 0)

  if (votes[mostVotedIndex] === 0) return <p>No vote yet.</p>

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomIndex = (max) => Math.floor(Math.random() * max)

  const handleNextCLick = () => setSelected(randomIndex(anecdotes.length))

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes);
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVoteClick}>vote +</button>
      <button onClick={handleNextCLick}>next</button>
      <hr />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App