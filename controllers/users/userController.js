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
        console.log(req.currentUser);
    User.getRoleOptions();
    res.render('users/users/create', {
        title: 'Create user', 
        req,
        'actions': utils.getJSON('./models/users/user/actions.json'),
        //'fields': utils.getJSON('./models/users/user/fields.json'),
        'fields': _getFields(req),
        'baseUrl': utils.getBaseUrl(req)
    });
}

const edit = (req, res) => {
    User.findById(req.params.id)
    .then(user => {

        res.render('users/users/edit', {
            title: 'Edit user', 
            req, 
            user,
            'actions': utils.getJSON('./models/users/user/actions.json'),
            'fields': _getFields(req, user),
            'baseUrl': utils.getBaseUrl(req)
        });
    }).catch(err => {
        console.log(err);
        res.render('404', { title: 'User not found' });
      });
}

const save = (req, res) => {
    //req._saveContext = 'create';
    const user = new User(req.body);
    user.save()
      .then(result => {
            return res.send({ success: { message: 'User saved successfuly', result } });
      })
      .catch(err => {
          return res.send(err);
      });
}

const update = (req, res) => {

    const result = _checkPassword(req);
    if (result.errors !== undefined) {
        return res.send(result);
    }

    User.findById(req.params.id)
    .then(user => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.role = req.body.role;

        if (req.body.password) {
            user.password = req.body.password;
        }

        user.save()
        .then(result => {
            return res.send({ success: { message: 'User saved successfuly', result } });
        })
        .catch(err => {
    //console.log(err.errors);
            return res.send(err);
        });
    }).catch(err => {
        console.log(err);
        return res.status(404).json(err);
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

function _checkPassword(req, res) {

    let result = null;

    if (req.body.password == '') {
        if (req.method == 'PUT') {
            return true;
            // OK return
        }

        // Error return
        return {errors: {password: {message: 'Password is required'}}};
    }

    if (req.body.password != req.body.confirmPassword) {
        return {errors: {confirmPassword: {message: 'The 2 passwords don\'t match '}}};
    }

    return true;
}

function _getFields(req, user) {
    let fields = utils.getJSON('./models/users/user/fields.json');
    fields.forEach(field => {
        if (field.name == 'password') {
            return;
        }

       if (field.name == 'role') {
           field.options = req.currentUser.roleOptions;
       }

       if (user !== undefined) {
           field.value = user[field.name]; 
       }
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
