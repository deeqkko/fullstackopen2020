import React from 'react';

export const SearchForm = (props) => {
    return(
      <div>
      <form>
        <p>Search Countries:</p>
        <input value={props.search}
               onChange={props.handleSearch}
        />
      </form>
      </div>
    )
  }
  
export const Results = (props) => {
    if (props.results.length > 10) {
        return(
            <NoResult />
        )
    } else if (props.showResultView === true) {
        return(
            <div>
                <ResultList results={props.results}
                          handleClick={props.handleClick}
                /> 
                <ResultView country={props.results[props.detailView]}
                            weather={props.weather} /> 
           </div>
        )

    } else if (props.results.length !== 1){
        return(
          <ResultList results={props.results}
                      handleClick={props.handleClick}
           />  
    )
    }  else {
        return(
           <ResultView country={props.results[0]}
                       weather={props.weather}
            /> 
        )
    }
}

export const NoResult = () => {
    return(
        <p>Too many matches. Set a different filter!</p>
    )
}

export const ResultList = (props) => {
    return(
        <ul>
            {props.results.map((result, index) =>
            <li key={index}>
                {result.name}
                <button value={index} 
                        onClick={props.handleClick}>
                        Show
                </button>
            </li>)}
        </ul>
    )
}

export const ResultView = (props) => {
    return(
        <div> 
            <h1>{props.country.name}</h1>
            <ul>
                <li>Capital: {props.country.capital}</li>
                <li>Population: {props.country.population}</li>
            </ul>
            <h2>Official languages</h2>
            <ul>
                {props.country.languages.map(language =>
                <li key={Math.random()}>{language.name}</li>)}
            </ul>
            <img src={props.country.flag} 
                height="30%" 
                width="30%"
                alt={`The flag of ${props.country.name}`}
            />
            <WeatherView weather={props.weather} />
        </div>
    )
}

export const WeatherView = (props) => {
    console.log(props.weather.data.success)
    if (props.weather.data.success !== false) {
        return(
            <div>
            <h2>Weather in {props.weather.data.location.name}:</h2>
                <ul>
                    <li>Temperature: {props.weather.data.current.temperature}</li>
                    <li>Wind: {props.weather.data.current.wind_speed} from 
                            {props.weather.data.current.wind_dir}
                    </li>
                </ul>
            </div>
        )
    } else {
        return(
            <div>
                <p>No weather information</p>
            </div>
        )
    }
}