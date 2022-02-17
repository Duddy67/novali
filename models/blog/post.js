const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../../helpers/utilities');

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title cannot be empty.'],
  },
  slug: {
    type: String,
    trim: true,
    required: false,
  },
  content: {
    type: String,
    trim: true,
    required: [true, 'Content cannot be empty.'],
  },
}, { timestamps: true });

postSchema.pre('save', function () {
    this.slug = utils.slugify(this.title)
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;