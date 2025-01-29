import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [searchedString, setSearchedString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (contact) => {
    if (persons.filter(p => p.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()).length > 0) {
      alert(`${contact.name} is already in the phonebook !`)
      return 
    }

    const newPersons = [...persons, { name: contact.name, number: contact.number }]
    setPersons(newPersons)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    addContact({ name: newName, number: newNumber })
  }

  const onNameChange = (event) => setNewName(event.target.value)
  const onNumberChange = (event) => setNewNumber(event.target.value)
  const onSearchedStringChange = (event) => setSearchedString(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <div>
        filter shown with: <input value={searchedString} onChange={onSearchedStringChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} /><br />
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(p => p.name.toLocaleLowerCase().includes(searchedString.toLocaleLowerCase())).map((p, i) => <li key={i}>{p.name} - {p.number}</li>)}
      </ul>
    </div>
  )
}

export default App