const mongoose = require("mongoose");

const bookLogSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  get_book_date: {
    type: Date,
    default: Date.now,
  },
  book_name: {
    type: String,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  book_case: {
    type: Number,
    default: 0
  }

});

bookLogSchema.virtual("id", function () {
  return this._id.toHexString();
});

bookLogSchema.set("toJSON", {
  virtuals: true,
});

exports.BookLog = mongoose.model("book_log", bookLogSchema);
