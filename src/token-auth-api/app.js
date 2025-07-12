const express = require('express');
const { v4: uuid } = require('uuid');

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;