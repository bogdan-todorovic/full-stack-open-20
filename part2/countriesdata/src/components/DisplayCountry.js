import React from 'react';

const DisplayCountry = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages</h3>
    <ul>
      {country.languages
        .map(language => {
          return <li key={language.iso639_1}>
            {language.name}
          </li> 
        })
      }
    </ul>
    <img src={country.flag} alt="No flag" height="100px" />
  </div>
);

export default DisplayCountry;
