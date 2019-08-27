const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
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
  responses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Response',
    required: true
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)
