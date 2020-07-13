import axios from "axios";

let token = null;
const baseUrl = "/api/blogs";

const setToken = newToken => token = `Bearer ${newToken}`;

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
};

const create = (blog) => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.post(baseUrl, blog, config);
  return request.then(response => response.data);
};

export default { 
  setToken,
  getAll,
  create
};
