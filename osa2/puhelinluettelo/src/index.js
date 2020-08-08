import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const persons = [
  { id: Math.random(), name: 'Ananias Pönttönen', number: '0400 123 123'},
  { id: Math.random(), name: 'Mauno Kekkonen', number: '0500 321 321'},
  { id: Math.random(), name: 'Einari Keski-Pörhölä', number: '045 1507 715517'}
]

ReactDOM.render(
  <React.StrictMode>
    <App persons={persons}/>
  </React.StrictMode>,
  document.getElementById('root')
);





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
