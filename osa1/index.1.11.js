import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistics = (props) => {
  if (props.count === 0) {
    return(
      <div>
        No feedback provided
      </div>
    )
  }
    return(
      <div>
          <table>
            <tbody>
              <tr><StatisticLine text="Grrreat! Luv it!" 
                                value={props.great}

                  />
              </tr>  
              <tr>
                <StatisticLine text="Got a cup of joe... Nothing to say"
                              value={props.neutral} 
                />
              </tr>
              <tr>
                <StatisticLine text="Crappy engine oil! Yuck! U suck!"
                              value={props.usuck} 
                />
              </tr>
              <tr><td>---</td></tr>
              <tr>
                <StatisticLine text="Vote count" value={props.count} />
              </tr>
              <tr>
                <StatisticLine text="Average" value={props.avg} />
              </tr>
              <tr>
                <StatisticLine text="Positive" value={props.pos} />
              </tr>
            </tbody>
          </table>
      </div>
    )
}

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return(
    <>
      <td>{text}:</td><td>{value}</td>
    </>
  )
}


const App = (props) => {
  const [great, setGreat] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [usuck, setUsuck] = useState(0)
  const [count, setCount] = useState(0)
  const [votes, setVotes] = useState(0)
  const [avg, setAvg] = useState(0)

  console.log(`Avg: ${avg} Votes: ${votes} Count: ${count}`)
  

  const addGreat = () => {
    return(
      setGreat(great + 1),
      calculateTotalAvgPositive(1)
    )
  }

  const addNeutral = () => {
    return(
      setNeutral(neutral + 1),
      calculateTotalAvgPositive(0)
    )
  }

  const addUsuck = () => {
    return(
      setUsuck(usuck + 1),
      calculateTotalAvgPositive(-1)
    )
  }

  const calculateTotalAvgPositive = (voteValue) => {
    let c = count
    let v = votes
    c += 1
    v += voteValue
    return(
      setCount(count + 1),
      setVotes(votes + voteValue),
      setAvg(v/c)
    )
   
  }

 
  return(
    <>
      <div>
        <h1>Unicafé</h1>
        <h2>How are we cooking today?</h2>
      </div>
      <Button handleClick={addGreat} text="Grreat!"/>
      <Button handleClick={addNeutral} text="Neutral"/>
      <Button handleClick={addUsuck} text="Yuck!" />
        <h2>Statistics:</h2>
        <Statistics
          great={great} 
          neutral={neutral} 
          usuck={usuck} 
          count={count}
          avg={avg.toFixed(2)}
          pos={`${(avg * 100).toFixed(2)}%`}
        />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


