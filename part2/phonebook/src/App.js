import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

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

                setNotification({
                  type: "success",
                  message: `${updatedPerson.name} 's number successfully updated.`
                });
                setTimeout(() => setNotification(null), 5000);
              })
            .catch(error => {
              setNotification({
                type: "error",
                message: `Information of ${changedPerson.name} has already been removed.`
              });
              setTimeout(() => setNotification(null), 5000);
            });
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
          setNotification({
            type: "success",
            message: `Person ${addedPerson.name} successfully added.`
          });
          setTimeout(() => setNotification(null), 5000);
        });
    }
  };

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id ===id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setNotification({
            type: "error",
            message: `Person ${personToDelete.name} successfully deleted.`
          });
          setTimeout(() => setNotification(null), 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={changeSearch} />
      <h2>Add new person</h2>
      <Notification notification={notification} />
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
