import axios from 'axios';

const defaultNodeApi = () => {
  const api = axios.create({
    
    baseURL: 'https://book-review-backend-node.onrender.com',
    // baseURL: 'http://localhost:5000',
    headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // withCredentials: true
  });
  return api;
}
export default defaultNodeApi;
