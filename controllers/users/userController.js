
const index = (req, res) => {
    console.log('index user');
    res.render('users/users/list', {title: 'All users', req});
}

const edit = (req, res) => {
    console.log('edit user');
    res.render('users/users/edit', {title: 'Edit user', req});
}

const create = (req, res) => {
    console.log('create user');
    res.render('users/users/create', {title: 'Create user', req});
}

const save = (req, res) => {
    console.log('save user');
}

const remove = (req, res) => {
    console.log('remove user');
}


module.exports = {
    index,
    edit,
    create,
    save,
    remove
}
