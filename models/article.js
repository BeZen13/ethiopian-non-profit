const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

let now = moment().format("l").split('/').reverse()
    now = now.map(num => Number(num, 10))
    let year = now[0]
    let day = now[1]
    let month = now[2]
    now = [year,month,day].join('')

    let displayDate = moment().format('MMMM Do YYYY, h:mm:ss a')
    
    const articleSchema = new Schema({
      published: {
        type: Boolean,
        default: false,
      },
      article: {
    type: Array,
  },
  user: {
    type: Schema.Types.ObjectId, ref: "User"
},
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  displayImage: {
    type: String,
  },
  catagory: {
    type: String,
    enum: ['Art', 'Politics', 'Business',]
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Number,
    default: Date.now(),
  },
  displayDate: {
    type: String,
    default: displayDate,
  },
})



module.exports = mongoose.model('Article', articleSchema)