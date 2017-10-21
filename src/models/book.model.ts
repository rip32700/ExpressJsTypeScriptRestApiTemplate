const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:  String,
    author: String,
    price: Number
});

const Book = mongoose.model("Book", bookSchema );

export {
    Book
};