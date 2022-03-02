const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utils = require('../../helpers/utilities');
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const roles = utils.getJSON('./models/users/user/roles.json');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name cannot be empty.'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: {
        validator: function(email) { 
            console.log(email+' : '+this._id);
            return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    trim: true,
    //required: [true, 'Content cannot be empty.'],
  },
  role: {
    type: String,
    trim: true,
    required: true,
    enum: roles,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // Now we set user password to hashed password
    this.password = await bcrypt.hash(this.password, salt);

    return next();
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
          return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

/*
 * Return the roles the current user is allowed to assign to other users.
 */
userSchema.virtual('assignableRoles').get(function () {
      console.log('roleOptions: '+this.name);
    let results = [];
    let start = false;

    // Loop through the roles ordered by hierarchy level.
    roles.forEach(role => {
        // Check the current user's role.
        if (role == this.role) {
            // Start to store the roles the current user is allowed to assign.
            start = true;
            // However, the current user cannot assign his own hierarchy level to other users.
            // N.B: He cannot create, edit or delete users from the same hierarchy level either.
            return;
        }

        if (!start) {
            return;
        }

        results.push(role);
    });

    return results;
});

// Create the User model.
const User = mongoose.model('User', userSchema);

module.exports = User;
