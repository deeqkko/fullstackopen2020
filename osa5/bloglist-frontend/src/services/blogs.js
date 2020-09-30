import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newEntry => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  console.log(config)
  const response = await axios.post(baseUrl, newEntry, config)
  return response.error
}

const update = (id, newData) => {
  const request = axios.put(`${baseUrl}/${id}`, newData)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, update, deleteBlog, setToken }