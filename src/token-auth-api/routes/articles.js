const express = import('express');
const router = express.Router();
const db = import('../memory');
const auth = import('../middleware/auth');

// POST /api/articles — create article
router.post('/', auth, (req, res) => {
  const { article_id, title, content, visibility } = req.body || {};

  if (!article_id || !title || !content || !visibility) {
    return res.sendStatus(400);
  }

  // Save article
  db.articles[article_id] = {
    article_id,
    title,
    content,
    visibility,
    user_id: req.user.user_id
  };

  res.sendStatus(201);
});

// GET /api/articles — view based on token
router.get('/', (req, res) => {
  const token = req.headers['authentication-header'];
  const hasToken = token && db.tokens.has(token);
  let login = null;
  if (hasToken) login = db.tokens.get(token);
  const user = login ? db.users[login] : null;

  const result = Object.values(db.articles).filter(article => {
    if (article.visibility === 'public') return true;
    if (article.visibility === 'logged_in' && hasToken) return true;
    if (article.visibility === 'private' && user && article.user_id === user.user_id) return true;
    return false;
  });

  res.status(200).json(result);
});

module.exports = router;