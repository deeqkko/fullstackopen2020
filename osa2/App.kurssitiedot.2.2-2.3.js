import React from 'react';
import './App.css';

const Total = ({ parts }) => {  
  let reducer = (acc, curr) => acc + curr
  const totalCount = parts.map(part => part.exercises)
  return(
    <>
      Total of {totalCount.reduce(reducer)} exercises
    </>
    )
  }

const Course = ({ course }) => {
  return(
    <>
    <h1>{course.name}</h1>
    <table>
      <thead>
        <tr>
          <td>Course</td>
          <td>Exercises</td>
        </tr> 
      </thead>
      <tbody>
      {course.parts.map(part =>
        <tr key={part.id}> 
          <td>{part.name}</td>
          <td>{part.exercises}</td>
        </tr>
          )}
      </tbody>
    </table>
    <p>
      <b><Total parts={course.parts}/></b>
    </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
