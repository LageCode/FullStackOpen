import express from 'express'
import dotenv from 'dotenv'

const app = express() // use express

dotenv.config() // fetch env vars from .env file

const PORT = process.env.PORT

const contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(contacts) // response.json -> a json object
})

app.get('/api/persons/:id', (req, res) => {
    const searchedId = req.params.id
    const searchedPerson = contacts.find(c => c.id === searchedId)
    if (searchedPerson) {
        res.json(searchedPerson) 
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${contacts.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.listen(PORT, () => { // use port env variable 
    console.log(`Server listening on port:${PORT}`)
})