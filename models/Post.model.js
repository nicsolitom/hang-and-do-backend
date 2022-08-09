const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    postText: { type: String, required: true },
    imgUrl: String,
    plan: { type: Schema.Types.ObjectId, ref: "Plan" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postSchema);
 