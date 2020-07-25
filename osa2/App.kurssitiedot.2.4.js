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
    <h2>{course.name}</h2>
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

const Courses = ({ courses }) => {
  return(
    courses.map(course => 
    <Course key={course.id}course={course} />
      )
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development with Node and React</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App;
