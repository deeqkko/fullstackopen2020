import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const RandomGenerator = (min, max, selected) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  do {
    var randomNumber = Math.floor(Math.random() * (max - min)) + min
  } while (randomNumber === selected)
  console.log(randomNumber, selected)
  return randomNumber  
}


const Display = ({ anecdote }) => {
  return(
    <>
      {anecdote}
    </>
  )
}

const Button = ({ handleClick }) => {
  return(
    <button onClick={handleClick}>GO!</button>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anecdote, setAnecdote] = useState("Press GO! to get an anecdote...")

  const GetAnecdote = () => {
    setSelected(RandomGenerator(0,6,selected))
    setAnecdote(anecdotes[selected])
    
  }

  return (
    <div>
    <h1>Anecdote-o-matic</h1>
      <p>
        <Display anecdote={anecdote} />
      </p>
      <Button handleClick={GetAnecdote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

export default App;