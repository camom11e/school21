require('dotenv').config();
const axios = require('axios');

global.accessToken = null;

async function fetchToken() {
  try {
    const response = await axios.post(
      "https://auth.sberclass.ru/auth/realms/EduPowerKeycloak/protocol/openid-connect/token",
      new URLSearchParams({
        client_id: 's21-open-api',
        username: process.env.SCHOOL_LOGIN,
        password: process.env.SCHOOL_PASSWORD,
        grant_type: 'password'
      }),
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    global.accessToken = response.data.access_token;
    console.log(`Токен получен : ${global.accessToken}`);
  } catch (error) {
    console.error("Ошибка получения токена:", error.response?.data || error.message);
  }
}

setTimeout(() => fetchToken(), 3000)

// Экспортируем функцию обновления токена (при необходимости)
module.exports = {
  fetchToken
};
