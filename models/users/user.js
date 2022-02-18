const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../../helpers/utilities');

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


const User = mongoose.model('User', userSchema);
module.exports = User;
