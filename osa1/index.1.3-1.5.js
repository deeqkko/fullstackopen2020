import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
//   const course = `Half stack app development`
  // const parts = [
  //   {
  //     name: `Fundamentals of React`,
  //     exercises: 10
  //   },
  //   {
  //     name: `Using props to pass data`,
  //     exercises: 7
  //   },
  //   {
  //     name: `State of a component`,
  //     exercises: 14
  //   }
  // ]

const course = {
  name: `Half stack app development`,
  parts: [
    {
      name: `Fundamentals of React`,
      exercises: 10
    },
    {
      name: `Using props to pass data`,
      exercises: 7
    },
    {
      name: `State of a component`,
      exercises: 14
    }
  ]
}

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
        <Part part={props.part[0].name} ex={props.part[0].exercises} />
        <Part part={props.part[1].name} ex={props.part[1].exercises} />
        <Part part={props.part[2].name} ex={props.part[2].exercises} />
      </>
    )
  }

  const Total = (props) => {
    let exercises = []
    props.sum.forEach(ex => {
      exercises.push(ex.exercises)
    })
    return(
      <>
        <p>Number of exercises {exercises.reduce((a, b) => a + b, 0)}</p>
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
      <Header course={course.name}/>
      <Content part={course.parts}/>
      <Total sum={course.parts} />
     
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))