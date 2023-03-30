const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const routes = require('./routes');

const app = express();

// middleware para aceitar requisições com body json
app.use(express.json());
app.use(routes);
// Error handler
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

// Começar a rodar o servidor http
app.listen(3000, () => console.log('Server started at http://localhost:3000 🤠'));
