const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utils = require('../../helpers/utilities');
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
}, { timestamps: true });

userSchema.pre('save', async function () {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model('User', userSchema);
module.exports = User;
