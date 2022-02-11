const express = require('express');
const postController = require('../controllers/blog/postController');

const router = express.Router();

router.get('/create', postController.create);
router.get('/', postController.index);
router.post('/', postController.save);
router.get('/:id', postController.edit);
router.delete('/:id', postController.remove);

module.exports = router;
