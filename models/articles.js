const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  saved: {
    type: Boolean,
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
