import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    /*const nonExisting = {
        id: 10000,
        name: 'nonexist',
        number: '2017-12-10T17:30:31.098Z',
    }*/
    return request.then(response => {
       // response.data = response.data.concat(nonExisting)
        return response
    })
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
