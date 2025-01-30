import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => axios.get(url)

const create = (newContact) => axios.post(url, newContact)

export default {
    getAll,
    create
}