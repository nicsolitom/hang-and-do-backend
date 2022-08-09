const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const planSchema = new Schema(
  {
    title: { type: String, required: true },
    dateTime: Date,
    description: { type: String, required: true },
    imgUrl: String,
    location: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User"},
    inviteLink: String,
    joined: [{ type: Schema.Types.ObjectId, ref: "User"}],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    timestamps: true
  }
);

module.exports = model('Plan', planSchema);
