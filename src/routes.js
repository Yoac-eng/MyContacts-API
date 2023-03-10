const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get(
  '/contacts',
  (request, response, next) => {
    request.appId = 'IdDoApp';
    next();
  },
  ContactController.index,
);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
// Editar um contato
router.put('/contacts/:id', ContactController.update);

module.exports = router;
