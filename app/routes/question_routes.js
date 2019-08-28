const express = require('express')
const passport = require('passport')
const Question = require('../models/question')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
router.post('/questions', requireToken, (req, res, next) => {
  // set owner of new question to be current user
  console.log('req is ', req.body.question)
  req.body.question.owner = req.user.id

  Question.create(req.body.question)
    .then(question => {
      res.status(201).json({ question: question.toObject() })
    })
    .catch(next)
})

// INDEX
router.get('/questions', (req, res, next) => {
  Question.find()
    .populate('responses')
    .then(questions => {
      // `questions` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return questions.map(question => question.toObject())
    })
    // respond with status 200 and JSON of the questions
    .then(questions => res.status(200).json({ questions: questions }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/questions/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Question.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "question" JSON
    .then(question => res.status(200).json({ question: question.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/questions/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.question.owner

  Question.findById(req.params.id)
    .then(handle404)
    .then(question => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, question)

      // pass the result of Mongoose's `.update` to the next `.then`
      return question.update(req.body.question)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/questions/:id', requireToken, (req, res, next) => {
  Question.findById(req.params.id)
    .then(handle404)
    .then(question => {
      // throw an error if current user doesn't own `question`
      requireOwnership(req, question)
      // delete the question ONLY IF the above didn't throw
      question.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
