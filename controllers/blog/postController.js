const Post = require('../../models/blog/post');
const utils = require('../../helpers/utilities');


const index = (req, res) => {
    Post.find()
    .then(items => {
        res.render('blog/posts/list', {
            title: 'All posts',
            req,
            items,
            'actions': utils.getJSON('./models/blog/post/actions.json'),
            'columns': utils.getJSON('./models/blog/post/columns.json'),
            'baseUrl': utils.getBaseUrl(req)
        });
    })
    .catch(err => {
        console.log(err);
    });
}

const edit = (req, res) => {
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
            if (req.body._close) {
                res.redirect('/blog/posts');
            }
            else {
                res.redirect('/blog/posts/'+post._id);
            }
      })
      .catch(err => {
        console.log(err);
      });
}

const update = (req, res) => {
    //console.log('edit post: '+req.params.id);
    //console.log(req.body);
    Post.findById(req.params.id)
    .then(post => {
        post.title = req.body.title;
        post.content = req.body.content;

        post.save()
        .then(result => {
            if (req.body._close) {
                res.redirect('/blog/posts');
            }
            else {
                res.redirect('/blog/posts/'+post._id);
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/blog/posts/'+post._id);
        });
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'Post not found' });
    });
}

const cancel = (req, res) => {
    //console.log('cancel ');
    res.redirect('/blog/posts');
}

const destroy = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(result => {
        console.log('destroy post');
        res.redirect('/blog/posts');
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'Post not found' });
    });
}

function _getFields(post) {
    let fields = utils.getJSON('./models/blog/post/fields.json');
    fields.forEach(field => {
       field.value = post[field.name]; 
    });

    return fields;
}

module.exports = {
    index,
    edit,
    create,
    cancel,
    save,
    update,
   destroy 
}
