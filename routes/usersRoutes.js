const express = require('express');
const userController = require('../controllers/users/userController');

const router = express.Router();

router.get('/create', userController.create);
router.get('/', userController.index);
router.post('/', userController.save);
// Important: Put the routes with conditional parameter BEFORE the routes with static parameter.
router.get('/cancel/:id?', userController.cancel);
router.get('/:id', userController.edit);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;

