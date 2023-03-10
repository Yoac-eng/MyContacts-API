const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get(
  '/contacts',
  // Para aplicar um ou vários middlewares pra uma rota especifica, podemos passar como um parametro
  // do método get que irá pegar a rota;
  (request, response, next) => {
    request.appId = 'IdDoApp';
    // Iremos receber um outro parametro chamado next, que é uma função que serve pra passar
    // a requisição adiante;

    // Feito isso, agora a propriedade appID é acessível para o controller que vai ter acesso
    // a essa mesma request
    next();
  },
  ContactController.index,
);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);

module.exports = router;
