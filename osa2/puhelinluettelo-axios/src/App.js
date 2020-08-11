import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, PersonForm, ResultCatalog } from './components/phonebook'
import './App.css';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('fetching...')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('Completed')
      })
  }, [])

  const names = []
  for (let i in persons) { names.push(persons[i].name)}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addEntry = () => {
    const entryObject = {
      id: Math.random(),
      name: newName,
      number: newNumber
    }
    names.includes(newName) 
      ? duplicateAlert() 
      : setPersons(persons.concat(entryObject))
    setNewName('')
    setNewNumber('')
  }

  const updatePhonebook = (event) => {
    event.preventDefault()
    addEntry()
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const duplicateAlert = () => alert(`${newName} already in the Phonebook!`)

  const personsFiltered = persons.filter(persons => 
    persons.name.toLowerCase().includes(filter.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add Person:</h3>
      <PersonForm updatePhonebook={updatePhonebook} 
                  newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
      />
      <h2>Numbers:</h2>
      <ResultCatalog persons={personsFiltered} />
    </div>
  )

}

export default App;
