const express = require('express');
const userController = require('../controllers/users/userController');

const router = express.Router();

router.get('/create', userController.create);
router.get('/', userController.index);
router.post('/', userController.save);
router.get('/:id', userController.edit);
router.delete('/:id', userController.remove);

module.exports = router;

