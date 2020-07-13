import axios from "axios";

const login = credentials => {
  const request = axios.post("/api/users/login", credentials);
  return request.then(response => response.data);
};

export default { login };
