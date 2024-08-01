import axios from 'axios';

const defaultNodeApi = () => {
  const api = axios.create({
    baseURL: 'https://book-review-backend-node.onrender.com',
    headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // withCredentials: true
  });
  return api;
}
export default defaultNodeApi;
