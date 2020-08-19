import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm, Results } from './components/countries'
import './App.css';

const countryUrl = 'https://restcountries.eu/rest/v2/all'
const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showResultView, setShowResultView] = useState(false)
  const [detailView, setDetailView] = useState()
  const [weather, setWeather] = useState()
  const [city, setCity] = useState()
  
  const countriesFiltered = countries.filter(countries =>
    countries.name.toLowerCase().includes(search.toLowerCase()))

    
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setShowResultView(false)
    if (countriesFiltered.length === 1) {
      setCity(countriesFiltered[0].capital)
      //console.log(countriesFiltered[0].capital)
      
    }
     
  }

  const handleShowClick = (event) => {
    setDetailView(event.target.value)
    setShowResultView(true)
  }

  useEffect(() => {
    axios
      .get(countryUrl)
      .then(response => {
        setCountries(response.data)
        //console.log('Data retrieved')
      })
  }, [])

  

  const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
    useEffect(() => {
      axios
        .get(weatherUrl)
        .then(response => {
          setWeather(response)
        })
        console.log('Weather retrieved')
        console.log(city)

    }, [city,detailView])
    
    
  //console.log(weather)
  return(
    <div>
      <h1>Countries</h1>
      <SearchForm search={search}
                  handleSearch={handleSearch}
      />
      <Results results={countriesFiltered}
               handleClick={handleShowClick}
               showResultView={showResultView}
               detailView={detailView}
               weather={weather}
       />
    </div>
  )
}



export default App;
