import axios from 'axios';

const authNodeApi = () => {
  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const api = axios.create({
    baseURL: 'https://book-review-backend-node.onrender.com',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // withCredentials: true
  });
  return api;
}

export default authNodeApi;