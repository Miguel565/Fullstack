import { useState, useEffect } from "react";
import personServices from "./services/persons";
import "./App.css";
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    }).catch(error => {
      console.error("Error fetching persons:", error);
    });
  }, []);

  const AddPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1, // Simple ID generation
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((person) => person.name === newName)) {  // Phonebook step 10, start
      const existingPerson = persons.find((person) => person.name === newName);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personServices.update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
            alert(`Updated ${newName}`);
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.error("Error updating person:", error);
            alert("Failed to update person. Please try again.");
          });
      }  // Phonebook step 10, end
    } else{
      setPersons(persons.concat(personObject));
      personServices.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .catch(error => {
          console.error("Error adding person:", error);
          alert("Failed to add person. Please try again.");
        });
      alert(`Added ${newName}`);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id = parseInt(event.target.id.value, 10);
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personServices.deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          alert(`Deleted ${personToDelete.name}`);
        })
        .catch(error => {
          console.error("Error deleting person:", error);
          alert("Failed to delete person. Please try again.");
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Phonebook</h1>
      </header>
      <Filter text={filter} onChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={AddPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filteredPersons} onSubmit={handleDelete} />
      </ul>
    </div>
  );
};

export default App;
