import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DisplayCountries from './components/DisplayCountries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const changeSearch = event => { 
    setSearch(event.target.value);
    updateDisplay(event.target.value);
  }; 

  const updateDisplay = (query) => {
    setCountriesToDisplay(countries.filter(country => 
      country.name.toLowerCase().indexOf(query.toLowerCase()) > -1  
    ))
  };

  return (
    <div>
      <div>
        Search country: <input value={search} onChange={changeSearch} />
      </div>
      <h1>Countries</h1>
      <DisplayCountries countries={countriesToDisplay} />
    </div>
  );
};

export default App;
