import React, { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const personsToShow = search 
    ?  persons.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    : persons;

  const changeNewName = event => setNewName(event.target.value);
  const changeNewNumber = event => setNewNumber(event.target.value);
  const changeSearch = event => setSearch(event.target.value);

  const add = event => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
    }
    else {
      const newPerson = { 
        name: newName, 
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={changeSearch} />
      <h2>Add new person</h2>
      <PersonForm 
        add={add}
        newName={newName} changeNewName={changeNewName}
        newNumber={newNumber} changeNewNumber={changeNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
