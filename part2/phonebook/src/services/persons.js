import axios from 'axios';

const baseUrl = "http://localhost:3001/persons";

const save = person => {
  const request = axios.post(baseUrl, person);
  return request.then(response => response.data);  
};

const update = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then(response => response.data);
};

const remove = id => axios.delete(`${baseUrl}/${id}`);

export default {
  save,
  update,
  remove
};