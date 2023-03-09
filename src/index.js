//Importar express, só precisamos passar o nome do pacote direto pois ele está dentro do node_modules
const express = require('express');

const app = express();

//Para manusear as rotas basta usar os metodos do app
//Passando como parametro a rota e a callback a ser executada quando a rota for acessada
app.get('/', (request, response) => {
  response.send("Hello World");
})


//Começar a rodar o servidor http
app.listen(3000, () => console.log("Server started at http://localhost:3000 🤠"));