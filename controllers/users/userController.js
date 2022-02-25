const User = require('../../models/users/user');
const utils = require('../../helpers/utilities');


const index = (req, res) => {
    User.find()
    .then(items => {
        res.render('users/users/list', {
            title: 'All users',
            req,
            items,
            'actions': utils.getJSON('./models/users/user/actions.json'),
            'columns': utils.getJSON('./models/users/user/columns.json'),
            'baseUrl': utils.getBaseUrl(req)
        });
    })
    .catch(err => {
        console.log(err);
    });
}

const create = (req, res) => {
    User.getRoleOptions();
    res.render('users/users/create', {
        title: 'Create user', 
        req,
        'actions': utils.getJSON('./models/users/user/actions.json'),
        'fields': utils.getJSON('./models/users/user/fields.json'),
        'baseUrl': utils.getBaseUrl(req)
    });
}

const edit = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        let fields = _getFields(user);

        if (req.query.valid !== undefined) {
            const valid = JSON.parse(req.query.valid);
            fields = utils.setFieldErrors(fields, valid.errors); 
        }
        console.log(fields);

        res.render('users/users/edit', {
            title: 'Edit user', 
            req, 
            user,
            'actions': utils.getJSON('./models/users/user/actions.json'),
            'fields': fields,
            'baseUrl': utils.getBaseUrl(req)
        });
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'User not found' });
      });
}

const save = (req, res) => {
    console.log('save user');
    const user = new User(req.body);
    user.save()
      .then(result => {
            if (req.body._close) {
                res.redirect('/users/users');
            }
            else {
                res.redirect('/users/users/'+user._id);
            }
      })
      .catch(err => {
        console.log(err);
      });
}

const update = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;

        user.save()
        .then(result => {
            if (req.body._close) {
                res.redirect('/users/users');
            }
            else {
                res.redirect('/users/users/'+user._id);
            }
        })
        .catch(err => {
            //console.log(err);
            //req.app.set('err', err);
            res.redirect('/users/users/'+user._id+'?valid='+encodeURIComponent(JSON.stringify(err)));
        });
    }).catch(err => {
        //console.log(err);
        res.render('404', { title: 'User not found' });
    });
}

const cancel = (req, res) => {
    //console.log('cancel ');
    res.redirect('/users/users');
}

const destroy = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(result => {
        console.log('destroy user');
        res.redirect('/users/users');
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'User not found' });
    });
}

function _getFields(user) {
    let fields = utils.getJSON('./models/users/user/fields.json');
    fields.forEach(field => {
        if (field.name == 'password') {
            return;
        }

       if (field.name == 'role') {
           field.options = user.roleOptions;
       }

       field.value = user[field.name]; 
    });

    return fields;
}

module.exports = {
    index,
    edit,
    create,
    update,
    cancel,
    save,
    destroy
}
