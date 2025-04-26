const express = require('express');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Маршруты
app.use('/api', require('./routes/api'));

// Старт сервера
app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порту ${process.env.PORT}`);
});