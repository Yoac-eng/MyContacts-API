const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

// Middleware q nem esta sendo utilizado, so de exemplo
router.get(
  '/contacts',
  (request, response, next) => {
    request.appId = 'IdDoApp';
    next();
  },
  ContactController.index,
);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.delete('/contacts/:id', ContactController.delete);
router.put('/contacts/:id', ContactController.update);

// Category Routes
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.get('/categories/:id', CategoryController.show);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
