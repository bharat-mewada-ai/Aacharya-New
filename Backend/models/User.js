const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  goal: { type: String, required: true },
  lifestyle: { type: String, required: true },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    hair: String,
    top: String,
    mood: String
  },
  tasks: [{
    title: String,
    xp: Number,
    done: Boolean,
    icon: String
  }],
  missions: [{
    id: Number,
    title: String,
    desc: String,
    xp: Number,
    icon: String,
    accepted: Boolean,
    completed: Boolean,
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);