import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => axios.get(url)

const create = (newContact) => axios.post(url, newContact)

const remove = (id) => axios.delete(`${url}/${id}`)

export default {
    getAll,
    create,
    remove
}