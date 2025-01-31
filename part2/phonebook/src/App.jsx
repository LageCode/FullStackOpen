import { useState, useEffect } from 'react'
import axios, { HttpStatusCode } from 'axios'

import contactService from './services/contacts'

const InputField = ({ name, val, setVal }) => <div>
  <label htmlFor={`${name}-input-id`}>{name}</label>
  <input id={`${name}-input-id`} value={val} onChange={(event) => setVal(event.target.value)} />
</div>

const FilterField = ({ filterString, setFilterString }) => <div>
  <h2>Search</h2>
  <InputField name={"Filter shown with"} val={filterString} setVal={setFilterString} />
</div>

const NewContactForm = ({ addAction }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault()
    addAction({ name, number })
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

const ContactList = ({ contacts, filterString, removeAction }) => <div>
  <h2>Contacts</h2>
  <table>
    <tbody>
      {contacts
        .filter(c => c.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()))
        .map((c, i) => <tr key={i}>
          <th>{c.name}</th><td>{c.number}</td><td><button onClick={() => removeAction(c.id, c.name)}>Remove</button></td>
        </tr>)}
    </tbody>
  </table>
</div>

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState("")

  useEffect(() => {
    contactService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContactAction = ({ name, number }) => {
    const newContact = { name, number }

    contactService
      .create(newContact)
      .then((response) => {
        if (response.status === HttpStatusCode.Created) {
          const newPersons = [...persons, newContact]
          setPersons(newPersons)
        }
      })
  }

  const removeContactAction = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .remove(id)
        .then((response) => {
          if (response.status === HttpStatusCode.Ok) {
            const newPersons = persons.filter(p => p.id !== id)
            setPersons(newPersons)
          }
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterField filterString={filterString} setFilterString={setFilterString} />
      <NewContactForm addAction={addContactAction} />
      <ContactList contacts={persons} filterString={filterString} removeAction={removeContactAction} />
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