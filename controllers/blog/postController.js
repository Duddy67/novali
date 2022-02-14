const fs = require('fs');
const utils = require('../../helpers/utilities');
const Post = require('../../models/blog/post');
const { post } = require('../../routes/blogRoutes');


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
    console.log(req.params.id);
    Post.findById(req.params.id)
    .then(post => {

        res.render('blog/posts/edit', {
            title: 'Edit post', 
            req, 
            post,
            'actions': utils.getJSON('./models/blog/post/actions.json'),
            'fields': _getFields(post),
            'baseUrl': utils.getBaseUrl(req)
        });
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'Post not found' });
      });
}

const create = (req, res) => {
    //console.log('create post');
    res.render('blog/posts/create', {
        title: 'Create post', 
        req,
        'actions': utils.getJSON('./models/blog/post/actions.json'),
        'fields': utils.getJSON('./models/blog/post/fields.json'),
        'baseUrl': utils.getBaseUrl(req)
    });
}

const save = (req, res) => {
    console.log('save post');
    console.log(req.body);

    const post = new Post(req.body);
    post.save()
      .then(result => {
            res.redirect('/blog/posts/'+post._id);
      })
      .catch(err => {
        console.log(err);
      });
}

const update = (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'Post not found' });
      });
}

const remove = (req, res) => {
    console.log('remove post');
}

function _getFields(post) {
    let fields = utils.getJSON('./models/blog/post/fields.json');
    fields.forEach(field => {
       field.value = post[field.name]; 
    });

    console.log(fields);
    return fields;
}

module.exports = {
    index,
    edit,
    create,
    save,
    update,
    remove
}
