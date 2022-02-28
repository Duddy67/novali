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
        validator: (email) => emailRegex.test(email),
        message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Content cannot be empty.'],
  },
  role: {
    type: String,
    trim: true,
    required: true,
    enum: roles,
  },
}, { timestamps: true });

userSchema.pre('save', async function () {
     console.log('pre user id '+this._id);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    this.password = await bcrypt.hash(this.password, salt);
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

userSchema.virtual('roleOptions').get(function () {
    const options = roles;
    return options;
});

userSchema.statics.getRoleOptions = function() {
    return roles;
};

// Create the User model.
const User = mongoose.model('User', userSchema);

module.exports = User;
