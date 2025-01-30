import { useState, useEffect } from 'react'
import axios from 'axios'

const InputField = ({ name, val, setVal }) => <div>
  <label htmlFor={`${name}-input-id`}>{name}</label>
  <input id={`${name}-input-id`} value={val} onChange={(event) => setVal(event.target.value)} />
</div>

const FilterField = ({ filterString, setFilterString }) => <div>
  <h2>Search</h2>
  <InputField name={"Filter shown with"} val={filterString} setVal={setFilterString} />
</div>

const NewContactForm = ({ addContactAction }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault()
    addContactAction({ name, number })
    setName("");
    setNumber("");
  }

  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={onFormSubmit}>
        <InputField name={"Name"} val={name} setVal={setName} />
        <InputField name={"Number"} val={number} setVal={setNumber} />
        <button type='submit'>New</button>
      </form>
    </div>
  )
}

const ContactList = ({ contacts, filterString }) => <div>
  <h2>Contacts</h2>
  <table>
    <tbody>
      {contacts
        .filter(c => c.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()))
        .map((c, i) => <tr key={i}>
          <th>{c.name}</th><td>{c.number}</td>
        </tr>)}
    </tbody>
  </table>
</div>

const Phonebook = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [filterString, setFilterString] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addContactAction = ({ name, number }) => {
    const newPersons = [...persons, { name, number }]
    setPersons(newPersons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterField filterString={filterString} setFilterString={setFilterString} />
      <NewContactForm addContactAction={addContactAction} />
      <ContactList contacts={persons} filterString={filterString} />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Phonebook />
    </div>
  )
}

export default App