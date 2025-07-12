const express = require('express');
const { v4: uuid } = require('uuid');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/article');

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/authenticate', authRoutes);
app.use('/api/logout', authRoutes);
app.use('/api/articles', articleRoutes);

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = server;