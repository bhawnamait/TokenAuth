import express from 'express';
import db from '../memory.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { user_id, login, password } = req.body || {};
  if (!user_id || !login || !password) return res.sendStatus(400);

  db.users[login] = { user_id, login, password };
  res.sendStatus(201);
});

export default router;