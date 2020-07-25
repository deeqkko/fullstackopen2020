// file located at src/components

import React from 'react'

export const Total = ({ parts }) => {  
    let reducer = (acc, curr) => acc + curr
    const totalCount = parts.map(part => part.exercises)
    return(
      <>
        Total of {totalCount.reduce(reducer)} exercises
      </>
      )
    }
  
export const Course = ({ course }) => {
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
  
export const Courses = ({ courses }) => {
    return(
      courses.map(course => 
      <Course key={course.id}course={course} />
        )
    )
  }