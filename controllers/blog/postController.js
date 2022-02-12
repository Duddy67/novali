const fs = require('fs');
const utils = require('../../helpers/utilities');


const index = (req, res) => {
    //console.log(utils.getBaseUrl(req));
    //console.log(utils.getJSON('./models/blog/post/actions.json'));
    res.render('blog/posts/list', {
        title: 'All posts',
        req,
        'actions': utils.getJSON('./models/blog/post/actions.json'),
        'baseUrl': utils.getBaseUrl(req)
    });
}

const edit = (req, res) => {
    console.log('edit post');
    res.render('blog/posts/edit', {title: 'Edit post', req, 'baseUrl': utils.getBaseUrl(req)});
}

const create = (req, res) => {
    //console.log('create post');
    res.render('blog/posts/create', {
        title: 'Create post', 
        req,
        'actions': utils.getJSON('./models/blog/post/actions.json'),
        'baseUrl': utils.getBaseUrl(req)
    });
}

const save = (req, res) => {
    console.log('save post');
}

const remove = (req, res) => {
    console.log('remove post');
}

module.exports = {
    index,
    edit,
    create,
    save,
    remove
}
