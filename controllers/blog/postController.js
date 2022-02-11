const fs = require('fs');


const index = (req, res) => {
    const actions = _getJSON('actions');
    //console.log(actions);
    //console.log('index post');
    res.render('blog/posts/list', {title: 'All posts', req, actions});
}

const edit = (req, res) => {
    console.log('edit post');
    res.render('blog/posts/edit', {title: 'Edit post', req});
}

const create = (req, res) => {
    console.log('create post');
    res.render('blog/posts/create', {title: 'Create post', req});
}

const save = (req, res) => {
    console.log('save post');
}

const remove = (req, res) => {
    console.log('remove post');
}

const _getJSON = (fileName) => {
    let rawdata = fs.readFileSync('./models/blog/post/'+fileName+'.json');
    return JSON.parse(rawdata);
}

module.exports = {
    index,
    edit,
    create,
    save,
    remove
}
