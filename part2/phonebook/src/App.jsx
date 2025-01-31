import { useState, useEffect } from 'react'
import { HttpStatusCode } from 'axios'

import './index.css'
import contactService from './services/contacts'

const NotificationTypes = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const Notification = ({ type, message }) => <div className={`notification ${type}`}>
  <p>{message}</p>
</div>

const InputField = ({ name, val, setVal }) => <div>
  <label htmlFor={`${name}-input-id`}>{name}</label>
  <input id={`${name}-input-id`} value={val} onChange={(event) => setVal(event.target.value)} />
</div>

const FilterField = ({ filterString, setFilterString }) => <div>
  <h2>Search</h2>
  <InputField name={"Filter shown with"} val={filterString} setVal={setFilterString} />
</div>

const NewContactForm = ({ addAction, updateAction, triggerNotification }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault()

    contactService.getByName(name).then(response => {
      if (response.data.length > 0) {
        const id = response.data[0].id
        updateAction(id, { name, number })
      } else {
        addAction({ name, number })
        setName("");
        setNumber("");
      }
    })
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
  const [notification, setNotification] = useState({
    type: null,
    message: null
  })

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
      .then(() => {
        triggerNotification({ type: NotificationTypes.SUCCESS, message: `${name} successfully created.` })
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

  const updateContactAction = (id, { name, number }) => {
    if (window.confirm(`Override contact ${name} with new number: ${number} ?`)) {
      contactService
        .update({ id, name, number })
        .then((response) => {
          if (response.status === HttpStatusCode.Ok) {
            const newPersons = persons.map(p => p.id === id ? { id, name, number } : p)
            setPersons(newPersons)
          }
        })
        .then(() => {
          triggerNotification({ type: NotificationTypes.SUCCESS, message: `${name} successfully updated.` })
        })
    }
  }

  const triggerNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification({ type: null, message: null })
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {notification.message && <Notification type={notification.type} message={notification.message} />}
      <FilterField filterString={filterString} setFilterString={setFilterString} />
      <NewContactForm addAction={addContactAction} updateAction={updateContactAction} triggerNotification={triggerNotification} />
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