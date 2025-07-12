const { v4: uuid } = import('uuid');
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/article.js';
import express from 'express';
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