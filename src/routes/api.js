const express = require('express');
const router = express.Router();
const db = require('../db');

// Получение студентов с фильтрацией
router.get('/students', (req, res) => {
  const { skill, level } = req.query;
  
  const query = db.prepare(`
    SELECT u.*, s.skill_name, s.skill_level 
    FROM users u
    JOIN skills s ON u.name_login = s.name_login
    WHERE s.skill_name = ? AND s.skill_level >= ?
  `);
  
  res.json(query.all(skill, level || 0));
});

module.exports = router;