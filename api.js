const axios = require('axios');

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://api-pelu-canina-snoopy.onrender.com', // URL base de la API
  timeout: 1000, // Tiempo de espera de las peticiones
});

module.exports = apiClient;



const API_BASE_URL = 'https://api-pelu-canina-snoopy.onrender.com/api';

async function registerUser(userData) {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error de conexión con la API');
  }
}



module.exports = { registerUser };
