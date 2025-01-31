import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => axios.get(url)

const getByName = (name) => axios.get(`${url}/?name=${name}`)

const create = (newContact) => axios.post(url, newContact)

const remove = (id) => axios.delete(`${url}/${id}`)

const update = (newContact) => axios.put(`${url}/${newContact.id}`, newContact)

export default {
    getAll,
    getByName,
    create,
    remove,
    update
}