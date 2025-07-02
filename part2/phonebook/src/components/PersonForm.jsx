const PersonForm = ({ onSubmit, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: 
        <input
          type="text"
          name="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div>
        Number: 
        <input 
          type="number"
          name="newNumber"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="Enter number"
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default PersonForm