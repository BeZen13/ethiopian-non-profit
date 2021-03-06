const express = require('express')
const articleCrudRouter = express.Router()
const Article = require('../../models/article')
const moment = require('moment')


articleCrudRouter.get('/', (req,res,next) => {

  let query = Article.find()
  // query.where({published: true})
  query.limit(20)
  query.exec(function (err,art) {
    if(err) return next(err)
    res.send(art)
  })
})
articleCrudRouter.get('/admin', (req,res,next) => {

  let query = Article.find()
  query.populate('user')
  query.where({published: true, })
  query.limit(20)
  query.sort({'date': -1})
  query.exec(function (err,art) {
    art = art.filter(article => {
      return article.user.isAdmin === true
    })
    if(err) return next(err)
    res.send(art)
  })
})
//get one
articleCrudRouter.get('/:_id', (req,res,next) => {
  let query = Article.findById({_id: req.params._id})
    // query.where({published: true})
    query.populate('user')
    query.exec( (err, article) => {
      if(err) {
        res.status(501)
        next(err)
      } else {
        console.log(article)
        res.status(201).send(article)
      }
    })
})

//make article
articleCrudRouter.post('/', (req,res,next) => {
  const newArticle = new Article(req.body)
  newArticle.user = req.body.user
  newArticle.save( (err, article) => {
    if(err) {
      res.status(501)
      next(err)
    } else {
      res.status(201).send(article)
    }
  })
})

articleCrudRouter.put('/:_id', (req,res,next) => {
  let query = Article.findByIdAndUpdate(
    {_id: req.params._id},
      req.body,
        {new: true})
          query.exec( (err, article) => {
            if(err) return  next(err)
            res.status(201).send(article)
          })
})

articleCrudRouter.delete('/:_id', (req,res,next) => {
  Article.findByIdAndDelete(req.params._id, (err, article) => {
    if(err) return next(err)
    res.send(article)
  })
})

module.exports = articleCrudRouter