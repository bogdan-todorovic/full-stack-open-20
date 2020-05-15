import React from 'react';

import DisplayCountry from './DisplayCountry';
import ShowDetails from './ShowDetails';

const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches. Enter more specific query. </p>
    );
  }
  else if (countries.length === 1) {
    return <DisplayCountry country={countries[0]} />
  }
  else {
    return (
      <div>
        {countries
          .map(country => {
            return (
              <div key={country.name}>
                {country.name}
                <ShowDetails country={country} />
              </div>
            );
          })
        }
      </div>
    )
  }
};

export default DisplayCountries;