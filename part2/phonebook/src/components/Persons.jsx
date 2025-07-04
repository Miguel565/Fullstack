const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name}: {person.number}
      <form onSubmit={() => onDelete(person.id)}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => {
        return <Person key={person.id} person={person} onDelete={onDelete} />;
      })}
    </div>
  );
}

export default Persons