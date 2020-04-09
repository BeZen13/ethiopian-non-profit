const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  article: {
    type: Array,
  },
  user: {
    type: String,
},
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  displayImage: {
    type: String,
  }
})

module.exports = mongoose.model('Article', articleSchema)