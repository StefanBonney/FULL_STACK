import axios from 'axios'

const url = '/api/persons'


const getAll = () => {
    return axios.get(url)
}

const create = (newPerson) => {
    return axios.post(url, newPerson)
}

const remove = (id) => {
    const newUrl = url + '/' + id
    console.log(newUrl)
    const request = axios.delete(newUrl)
    return request.then(response => response.data)
}

export default { getAll, create, remove}