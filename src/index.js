const express = require('express');

const routes = require('./routes');

// Instancia o express
const app = express();

// middleware para aceitar requisições com body json
app.use(express.json());
app.use(routes);

// Começar a rodar o servidor http
app.listen(3000, () => console.log('Server started at http://localhost:3000 🤠'));
