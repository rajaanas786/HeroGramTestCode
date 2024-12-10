import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://159.65.122.248/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
