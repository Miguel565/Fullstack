const Persons = ({ persons, onSubmit }) => {
  return (
    persons.map((person) => 
      <li key={person.id}>
        {person.name}: {person.number} 
        <form onSubmit={onSubmit}>
          <button type="submit">Delete</button>
        </form>
      </li>
    )
  );
}

export default Persons