const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  try {
    const students = db.prepare(`
      SELECT u.*, 
             json_group_array(json_object('name', s.skill_name, 'level', s.skill_level)) as skills
      FROM users u
      LEFT JOIN skills s ON u.name_login = s.name_login
      GROUP BY u.name_login
      LIMIT 50
    `).all();

    res.render('index', {
      students: students.map(s => ({
        ...s,
        skills: s.skills ? JSON.parse(s.skills) : []
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => console.log(`Server running on port: ${process.env.PORT}`));