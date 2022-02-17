const express = require('express');
const postController = require('../controllers/blog/apiController');

const router = express.Router();

//router.get('/create', postController.create);
router.get('/blog/posts', postController.index);
//router.post('/', postController.save);
router.get('/blog/posts/:id', postController.show);
//router.get('/cancel/:id?', postController.cancel);
//router.put('/:id', postController.update);
//router.delete('/:id', postController.destroy);

module.exports = router;

