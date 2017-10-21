"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    title: String,
    author: String,
    price: Number
});
const Book = mongoose.model("Book", bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.model.js.map