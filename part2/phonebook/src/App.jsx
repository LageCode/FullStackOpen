import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addContact = (contact) => {
    if (persons.filter(p => p.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()).length > 0) {
      alert(`${contact.name} is already in the phonebook !`)
      return 
    }

    const newPersons = [...persons, { name: newName }]
    setPersons(newPersons)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    addContact({ name: newName })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p, i) => <li key={i}>{p.name}</li>)}
      </ul>
    </div>
  )
}

export default App