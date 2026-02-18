const isDev = import.meta.env.MODE === 'development'
const envApiUrl = import.meta.env.VITE_API_URL

export const API_URL = envApiUrl
  ? envApiUrl
  : isDev
  ? 'http://localhost:8080'
  : 'https://mern-wallet-two.onrender.com'
