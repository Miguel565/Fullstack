import { useState, useEffect } from "react";
import contactServices from "./services/contacts";
import "./App.css";
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    contactServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    }).catch(error => {
      setMessage({
        type: 'error',
        text: 'Error fetching persons. Please try again later.',
        timeout: setTimeout(() => {
          setMessage(null);
        }, 5000)
      });
      console.error("Error fetching persons:", error);
    });
  }, [message]);

  const AddPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1, // Simple ID generation
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      setMessage({
        type: 'error',
        text: `${newName} is already added to phonebook`,
        timeout: setTimeout(() => {
          setMessage(null);
        }, 5000)
      });
    } else if(persons.some((person) => person.number === newNumber)) {
      const existingPerson = persons.find((person) => person.number === newNumber);
      setMessage({
        type: 'error',
        text: `This number: ${newNumber}, belong to ${existingPerson.name}. Please check the number and try again.`,
        timeout: setTimeout(() => {
          setMessage(null);
        }, 5000)
      });
    } else if (persons.some((person) => person.name === newName)) {  // Phonebook step 10, start
      const existingPerson = persons.find((person) => person.name === newName);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        contactServices.update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
            setMessage({
              type: 'success',
              text: `${newName} updated successful.`,
              timeout: setTimeout(() => {
                setMessage(null);
              }, 5000)
            });
          })
          .catch(error => {
            console.error("Error updating person:", error);
            setMessage({
              type: 'error',
              text: `Failed to update ${newName}. Please try again.`,
              timeout: setTimeout(() => {
                setMessage(null);
              }, 5000)
            });
          });
      }  // Phonebook step 10, end
    } else{
      setPersons(persons.concat(personObject));
      contactServices.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage({
            type: 'success',
            text: `Added ${newName} to phonebook.`,
            timeout: setTimeout(() => {
              setMessage(null);
            }, 5000)
          });
        })
        .catch(error => {
          console.error("Error adding person:", error);
          setMessage({
            type: 'error',
            text: `Failed to add ${newName}. Please try again.`,
            timeout: setTimeout(() => {
              setMessage(null);
            }, 5000)
          });
        });
    setNewName('')
    setNewNumber('')
  };

  const handleDelete = (id) => {
    contactServices.deletePerson(id)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage({
          type: 'success',
          text: `Deleted ${personToDelete.name} from phonebook.`,
          timeout: setTimeout(() => {
            setMessage(null);
          }, 5000)
        });
      })
      .catch(error => {
        console.error("Error deleting person:", error);
        setMessage({
          type: 'error',
          text: `Failed to delete ${personToDelete.name}. Please try again.`,
          timeout: setTimeout(() => {
            setMessage(null);
          }, 5000)
        });
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Phonebook</h1>
      </header>
      <Notification message={message} />
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
        <Persons persons={filteredPersons} onDelete={handleDelete} />
      </ul>
    </div>
  );
};

export default App;
