const { Pool } = require('pg');
require('./globalToken');
const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const BASEURL = process.env.BASE_URL 
const app = express();

const pool = new Pool({
  host: process.env.DB_HOST,       // например, 'localhost'
  port: process.env.DB_PORT,       // например, 5432
  user: process.env.DB_USER,       // имя пользователя
  password: process.env.DB_PASSWORD,  // пароль
  database: process.env.DB_NAME    // имя базы, например, 'db_school21'
});

// Пример функции для получения login из таблицы users:
async function getUserLogin() {
  const result = await pool.query('SELECT login FROM users LIMIT 1');
  if (result.rows.length === 0) {
    throw new Error("Пользователь не найден");
  }
  return result.rows[0].login;
}




// Middleware для проверки и передачи токена
app.use((req, res, next) => {
  if (!global.accessToken) {
    console.error("Токен ещё не доступен. Попробуйте позже.");
    return res.status(503).json({ error: "Токен не получен, повторите попытку через несколько секунд." });
  }
  req.token = global.accessToken;
  next();
});


app.get('/skills', async (req, res) => {
  const userLogin = await getUserLogin();
  console.log("Используем login:", userLogin);
  try {
    console.log(req.token, BASEURL)
    const response = await axios.get(
      `${BASEURL}v1/participants/${userLogin}/skills`,
      {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${req.token}`
        }
      }
    );
    res.json(response.data)
    console.log(res.json(response.data));
  } catch (error) {
    console.error("Ошибка запроса:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
