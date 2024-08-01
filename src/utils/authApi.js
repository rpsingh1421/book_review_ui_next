import axios from 'axios';

const authNodeApi = () => {
  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // withCredentials: true
  });
  return api;
}

export default authNodeApi;