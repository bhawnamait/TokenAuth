const db = require('../memory');

function auth(req, res, next) {
  const token = req.headers['authentication-header'];
  if (!token || !db.tokens.has(token)) return res.sendStatus(401);

  const login = db.tokens.get(token);
  req.user = db.users[login];
  next();
}

module.exports = auth;