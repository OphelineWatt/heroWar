import axios from 'axios';

const token = import.meta.env.VITE_SUPERHERO_TOKEN;

if (!token) {
  console.warn('Aucun token Superhero API trouvé. Veuillez définir VITE_SUPERHERO_TOKEN dans votre .env');
}

const api = axios.create({
  baseURL: `https://superheroapi.com/api.php/${token}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default api;
