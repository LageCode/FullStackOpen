import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'


const app = express() // use express
app.use(express.json()) // use body parser (needed for POST)

morgan.token('body', (req) => {
    if (Object.keys(req.body).length === 0) {
        return ""
    }

    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // use morgan middleware

dotenv.config() // fetch env vars from .env file

const PORT = process.env.PORT

let contacts = [
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
    return res.json(contacts) // response.json -> a json object
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const searchedPerson = contacts.find(c => Number(c.id) === id)
    if (searchedPerson) {
        return res.json(searchedPerson) 
    } else {
        return res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    return res.send(`
        <p>Phonebook has info for ${contacts.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(c => Number(c.id) !== id)
    return res.status(204).end()
})

const genId = () => Math.floor(Math.random() * 123456789)

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({ error: 'name and number musn\'t be missing' })
    }

    if (contacts.filter(c => c.name === req.body.name).length > 0) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const person = {...req.body, id: genId()}
    contacts.push(person)
    return res.json(person)
})

app.listen(PORT, () => { // use port env variable 
    console.log(`Server listening on port:${PORT}`)
})
