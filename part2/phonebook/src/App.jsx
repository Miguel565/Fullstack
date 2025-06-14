import { useState } from "react";
import "./App.css";
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "4345343456553", id: 1 },
    { name: "Ada Lovelace", number: "1234567890", id: 2 },
    { name: "Dan Abramov", number: "0987654321", id: 3 },
    { name: "Mary Poppins", number: "555-1234", id: 4 },
    { name: "John Doe", number: "111-2222", id: 5 },
    { name: "Jane Smith", number: "333-4444", id: 6 },
    { name: "Alice Johnson", number: "777-8888", id: 7 },
    { name: "Bob Brown", number: "999-0000", id: 8 },
    { name: "Charlie White", number: "222-3333", id: 9 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const AddPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1, // Simple ID generation
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
        <Persons persons={filteredPersons} />
      </ul>
    </div>
  );
};

export default App;
