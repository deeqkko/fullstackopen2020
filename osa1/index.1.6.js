import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Display = (props) => {
  return(
    <div>
      <p>Grrreat! Luv it! {props.great}<br />
      Got a cup of joe... Nothing to say {props.neutral}<br />
      Crappy engine oil! Yuck! U suck! {props.usuck}
      </p>
      <p>
        All votes: {props.all}<br />
        Average: {props.avg}
      </p>
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




const App = (props) => {
  const [great, setGreat] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [usuck, setUsuck] = useState(0)

  const addGreat = () => setGreat(great + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addUsuck = () => setUsuck(usuck + 1)
   
  return(
    <>
      <div>
        <h1>Unicafé</h1>
        <h2>How are we cooking today?</h2>
      </div>
      <Button handleClick={addGreat} text="Grreat!"/>
      <Button handleClick={addNeutral} text="Neutral"/>
      <Button handleClick={addUsuck} text="Yuck!" />
      <Display 
        great={great} 
        neutral={neutral} 
        usuck={usuck}
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


