const Post = require('../../models/blog/post');


const index = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    Post.find()
    .then(posts => {
        res.send(JSON.stringify(posts));
    })
    .catch(err => {
        res.send(JSON.stringify(err));
    });
}

const show = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Post.findById(req.params.id)
    .then(post => {
        res.send(JSON.stringify(post));
    })
    .catch(err => {
        res.send(JSON.stringify(err));
    });
}


module.exports = {
    index,
    show
}