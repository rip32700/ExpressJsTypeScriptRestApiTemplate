"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const book_controller_1 = require("../controllers/book.controller");
const router = express["Router"]();
exports.router = router;
// load controllers
const bookController = new book_controller_1.BookController();
// define the routes
router.get("/books", bookController.readAllBooks);
router.get("/books/:bookId", bookController.readOneBook);
router.post("/books", bookController.createOneBook);
//# sourceMappingURL=api.js.map