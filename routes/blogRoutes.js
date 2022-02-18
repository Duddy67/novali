const express = require('express');
const postController = require('../controllers/blog/postController');

const router = express.Router();

router.get('/create', postController.create);
router.get('/', postController.index);
router.post('/', postController.save);
// Important: Put the routes with conditional parameter BEFORE the routes with static parameter.
router.get('/cancel/:id?', postController.cancel);
router.get('/:id', postController.edit);
router.put('/:id', postController.update);
router.delete('/:id', postController.destroy);

module.exports = router;
