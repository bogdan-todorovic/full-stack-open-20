import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }, []);

  const personsToShow = search 
    ?  persons.filter(person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    : persons;

  const changeNewName = event => setNewName(event.target.value);
  const changeNewNumber = event => setNewNumber(event.target.value);
  const changeSearch = event => setSearch(event.target.value);

  const addPerson = event => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook.` 
        + `Do you want to replace the old number with new one`)) {

          const existingPerson = persons.find(person => person.name === newName);
          const changedPerson = {...existingPerson, number: newNumber};
          personsService
            .update(changedPerson.id, changedPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => 
                person.id !== updatedPerson.id ? person : updatedPerson));
              }
            );
      }
    }
    else {
      const newPerson = { 
        name: newName, 
        number: newNumber
      };
      personsService
        .save(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id ===id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={changeSearch} />
      <h2>Add new person</h2>
      <PersonForm 
        add={addPerson}
        newName={newName} changeNewName={changeNewName}
        newNumber={newNumber} changeNewNumber={changeNewNumber}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
          <Person key={person.id} person={person} deleteHandler={() => deletePerson(person.id)} />
        )}
      </div> 
    </div>
  );
};

export default App;
