const express = require('express');

// Importar as rotas para aplicação identificar elas
const routes = require('./routes');

// Instancia o express
const app = express();

// .use irá identificar as rotas
app.use(routes);

// Começar a rodar o servidor http
app.listen(3000, () => console.log('Server started at http://localhost:3000 🤠'));
