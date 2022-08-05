const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: String,
    img_url: String,
    projects: [String]
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
