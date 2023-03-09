const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

// A responsabilidade das rotas/endpoints irá ficar aqui
const router = Router();

// Exemplo de um get simples seguindo o padrão REST, onde o método do controller é uma callback
router.get('/contacts', ContactController.index);

module.exports = router;
