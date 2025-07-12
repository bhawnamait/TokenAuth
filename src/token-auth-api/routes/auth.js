import express from 'express';
import { v4 as uuid } from 'uuid';
import db from '../memory.js';

const router = express.Router();

// POST /api/authenticate
router.post('/', (req, res) => {
  const { login, password } = req.body || {};
  if (!login || !password) return res.sendStatus(400);

  const user = db.users[login];
  if (!user) return res.sendStatus(404);
  if (user.password !== password) return res.sendStatus(401);

  const token = uuid();
  db.tokens.set(token, login);
  res.status(200).json({ token });
});

// POST /api/logout
router.post('/logout', (req, res) => {
  const token = req.headers['authentication-header'];
  if (!token || !db.tokens.has(token)) return res.sendStatus(401);

  db.tokens.delete(token);
  res.sendStatus(200);
});

export default router;