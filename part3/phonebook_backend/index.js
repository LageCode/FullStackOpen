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

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.listen(PORT, () => { // use port env variable 
    console.log(`Server listening on port:${PORT}`)
})