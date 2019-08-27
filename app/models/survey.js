const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Survey', surveySchema)
