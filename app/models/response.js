const mongoose = require('mongoose')

const userResponseSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('UserResponse', userResponseSchema)
