const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  authors: {
    type: String,
  },
  year: {
    type: Date,
  },
  publisher: {
    type: String,
  },
  isbn: {
    type: String,
  },
  count: {
    type: Number,
  },
  page_count: {
    type: Number,
  },
  language: {
    type: String,
 },
 book_number : {
    type: Number,
 }
});

bookSchema.virtual("id", function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

exports.Book = mongoose.model("book", bookSchema);
