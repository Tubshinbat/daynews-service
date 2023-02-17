const mongoose = require("mongoose");

const NewsCommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Заавал нэрээ оруулна уу"],
  },
  comment: {
    type: String,
    required: [true, "Сэтгэгдэл заавал оруулна уу"],
  },

  news: {
    type: mongoose.Schema.ObjectId,
    ref: "News",
  },

  count: {
    type: Number,
    default: 0,
  },

  ip: {
    type: String,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewsComment", NewsCommentSchema);
