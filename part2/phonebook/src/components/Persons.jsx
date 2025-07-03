const Person = ({ person, onDelete}) => {
  const handleDelete = (data) => {
    if(window.confirm(`Do you really want to delete ${data.name}?`)) {
      onDelete(data.id)
    }
  }
  return (
      <li key={person.id}>
        {person.name}: {person.number}
        <form onSubmit={() => handleDete(person)}>
          <button type="submit">Delete</button>
        </form>
      </li>
    )
}

const Persons = ({ persons, onDelete }) => {
  return (<>
    {persons.map((person) => {
      <Person key={person.id} person={person} onDelete={onDelete} />
    })}
  </>);
}

export default Persons