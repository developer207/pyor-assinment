import axios from 'axios';


export const API_BASE_URL = "https://api.coingecko.com"

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;