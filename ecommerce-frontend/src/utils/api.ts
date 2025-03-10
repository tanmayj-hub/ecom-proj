// src/utils/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-gateway-url.com', // Clearly defined later
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
