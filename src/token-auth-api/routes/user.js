const express = require('express');
const router = express.Router();
const db = require('../memory');

router.post('/', (req, res) => {
  const { user_id, login, password } = req.body || {};
  if (!user_id || !login || !password) return res.sendStatus(400);

  db.users[login] = { user_id, login, password };
  res.sendStatus(201);
});

module.exports = router;