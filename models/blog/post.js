const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../../helpers/utilities');

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
}, { timestamps: true });

postSchema.pre('save', function () {
    this.slug = utils.slugify(this.title)
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;