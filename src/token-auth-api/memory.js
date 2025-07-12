const data = {
  users: {},         // login => { user_id, login, password }
  tokens: new Map(), // token => login
  articles: {}       // article_id => { title, content, visibility, user_id }
};

module.exports = data;