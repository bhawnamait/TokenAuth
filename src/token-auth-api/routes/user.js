app.post('/api/user', (req, res) => {
  const { user_id, login, password } = req.body || {};
  if (!required(req.body, ['user_id', 'login', 'password'])) return res.sendStatus(400);
  memory.users[login] = { user_id, password };
  return res.sendStatus(201);
});