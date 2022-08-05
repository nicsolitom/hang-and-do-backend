const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const planSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img_url: String,
    location: String,
    created_by: { type: Schema.Types.ObjectId, ref: "User"},
    invite_link: String,
    joined: [{ type: Schema.Types.ObjectId, ref: "User"}],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    timestamps: true
  }
);

module.exports = model('Plan', planSchema);
