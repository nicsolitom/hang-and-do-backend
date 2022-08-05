const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    post_text: { type: String, required: true },
    img_url: String,
    plan: { type: Schema.Types.ObjectId, ref: "Plan" },
    created_by: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postSchema);
 