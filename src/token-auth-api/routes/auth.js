app.post('/api/authenticate', (req, res) => {
  const { login, password } = req.body || {};
  if (!required(req.body, ['login', 'password'])) return res.sendStatus(400);

  const user = memory.users[login];
  if (!user) return res.sendStatus(404);
  if (user.password !== password) return res.sendStatus(401);

  const token = uuid();
  memory.sessions.set(token, login);
  return res.status(200).json({ token });
});

app.post('/api/logout', (req, res) => {
  const token = authToken(req);
  if (!token || !memory.sessions.has(token)) return res.sendStatus(401);

  memory.sessions.delete(token);
  return res.sendStatus(200);
});
