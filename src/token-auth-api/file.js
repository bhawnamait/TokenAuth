import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(express.json());

// In-memory store
const users = {};
const tokens = new Map();
const articles = {};

// Middleware for token authentication
function auth(req, res, next) {
  const token = req.headers['authentication-header'];
  if (!token || !tokens.has(token)) return res.sendStatus(401);
  const login = tokens.get(token);
  req.user = users[login];
  next();
}

// POST /api/user - register user
app.post('/api/user', (req, res) => {
  const { user_id, login, password } = req.body || {};
  if (!user_id || !login || !password) return res.sendStatus(400);
  users[login] = { user_id, login, password };
  res.sendStatus(201);
});

// POST /api/authenticate - login
app.post('/api/authenticate', (req, res) => {
  const { login, password } = req.body || {};
  if (!login || !password) return res.sendStatus(400);
  const user = users[login];
  if (!user) return res.sendStatus(404);
  if (user.password !== password) return res.sendStatus(401);
  const token = uuid();
  tokens.set(token, login);
  res.status(200).json({ token });
});

// POST /api/logout - logout
app.post('/api/logout', (req, res) => {
  const token = req.headers['authentication-header'];
  if (!token || !tokens.has(token)) return res.sendStatus(401);
  tokens.delete(token);
  res.sendStatus(200);
});

// POST /api/articles - create article
app.post('/api/articles', auth, (req, res) => {
  const { article_id, title, content, visibility } = req.body || {};
  if (!article_id || !title || !content || !visibility) return res.sendStatus(400);
  articles[article_id] = {
    article_id,
    title,
    content,
    visibility,
    user_id: req.user.user_id
  };
  res.sendStatus(201);
});

// GET /api/articles - view articles
app.get('/api/articles', (req, res) => {
  const token = req.headers['authentication-header'];
  const hasToken = token && tokens.has(token);
  const login = hasToken ? tokens.get(token) : null;
  const user = login ? users[login] : null;

  const result = Object.values(articles).filter(article => {
    if (article.visibility === 'public') return true;
    if (article.visibility === 'logged_in' && hasToken) return true;
    if (article.visibility === 'private' && user && article.user_id === user.user_id) return true;
    return false;
  });

  res.status(200).json(result);
});

// Start server
const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default server;
