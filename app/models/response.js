const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Response', responseSchema)
