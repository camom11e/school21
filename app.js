const express = require('express');

const BASE_URL = "https://edu-api.21-school.ru/services/21-school/api/swagger"
require('./globalToken');

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
