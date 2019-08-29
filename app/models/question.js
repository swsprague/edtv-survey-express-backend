const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: {
    type: Array,
    required: false
  },
  userResponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserResponse'
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)
