
app.get('/api/articles', (req, res) => {
  const token = authToken(req);
  const loggedIn = token && memory.sessions.has(token);
  const userLogin = loggedIn ? memory.sessions.get(token) : null;
  const userId = userLogin ? memory.users[userLogin]?.user_id : null;

  const result = Object.values(memory.posts).filter(article => {
    if (article.visibility === 'public') return true;
    if (loggedIn && article.visibility === 'logged_in') return true;
    if (loggedIn && article.user_id === userId) return true;
    return false;
  });

  return res.status(200).json(result);
});


app.post('/api/articles', (req, res) => {
  const token = authToken(req);
  if (!token || !memory.sessions.has(token)) return res.sendStatus(401);

  const { article_id, title, content, visibility } = req.body || {};
  if (!required(req.body, ['article_id', 'title', 'content', 'visibility'])) return res.sendStatus(400);

  const login = memory.sessions.get(token);
  const user = memory.users[login];

  memory.posts[article_id] = {
    article_id,
    title,
    content,
    visibility,
    user_id: user.user_id
  };

  return res.sendStatus(201);
});