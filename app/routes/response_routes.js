const express = require('express')
const passport = require('passport')
const Response = require('../models/response')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
router.post('/responses', requireToken, (req, res, next) => {
  // set owner of new response to be current user
  req.body.response.owner = req.user.id

  Response.create(req.body.response)
    .then(response => {
      res.status(201).json({ response: response.toObject() })
    })
    .catch(next)
})

// INDEX
router.get('/responses', (req, res, next) => {
  Response.find()
    .populate('questions')
    .then(responses => {
      // `responses` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return responses.map(response => response.toObject())
    })
    // respond with status 200 and JSON of the responses
    .then(responses => res.status(200).json({ responses: responses }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/responses/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Response.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "response" JSON
    .then(response => res.status(200).json({ response: response.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/responses/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.response.owner

  Response.findById(req.params.id)
    .then(handle404)
    .then(response => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, response)

      // pass the result of Mongoose's `.update` to the next `.then`
      return response.update(req.body.response)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/responses/:id', requireToken, (req, res, next) => {
  Response.findById(req.params.id)
    .then(handle404)
    .then(response => {
      // throw an error if current user doesn't own `response`
      requireOwnership(req, response)
      // delete the response ONLY IF the above didn't throw
      response.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
