import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = `Half stack app development`
  const part1 = `Fundamentals of React`
  const ex1 = 10
  const part2 = `Using props to pass data`
  const ex2 = 7
  const part3 = `State of component`
  const ex3 = 14

  const Header = (props) => {
    return(
      <>
        <h1>{props.course}</h1>
      </>
    )
  }

  const Content = (props) => {
    return(
      <>
        <Part part={props.part} ex={props.ex} />
      </>
    )
  }

  const Total = (props) => {
    return(
      <>
        <p>Number of exercises {props.sum.reduce((a, b) => a + b, 0)}</p>
      </>
    )
  }

  const Part = (props) => {
    return(
      <>
        <p>{props.part} {props.ex}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content part={part1} ex={ex1}/>
      <Content part={part2} ex={ex2}/>
      <Content part={part3} ex={ex3}/>
      <Total sum={[ex1, ex2, ex3]}/> 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))