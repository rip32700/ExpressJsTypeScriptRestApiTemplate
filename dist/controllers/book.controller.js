"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../common/utils");
const book_model_1 = require("../models/book.model");
class BookController {
    readAllBooks(req, res) {
        book_model_1.Book.find({}, function (err, books) {
            if (err) {
                utils.sendJSONresponse(res, 404, err);
            }
            else {
                utils.sendJSONresponse(res, 200, books);
            }
        });
    }
    readOneBook(req, res) {
        if (!req.params || !req.params.bookId) {
            utils.sendJSONresponse(res, 404, { "message": "No book ID in request" });
            return;
        }
        const bookId = req.params.bookId;
        book_model_1.Book.findById(bookId)
            .exec(function callback(err, book) {
            if (!book) {
                utils.sendJSONresponse(res, 404, { "message": "transaction ID not found" });
                return;
            }
            else if (err) {
                utils.sendJSONresponse(res, 404, err);
                return;
            }
            // success
            utils.sendJSONresponse(res, 200, book);
        });
    }
    createOneBook(req, res) {
        const data = BookController.extractBookInformationFromRequest(req, res);
        book_model_1.Book.create(data, function callback(err, book) {
            if (err) {
                utils.sendJSONresponse(res, 400, err);
            }
            else {
                utils.sendJSONresponse(res, 201, book);
            }
        });
    }
    static extractBookInformationFromRequest(req, res) {
        if (!req.body.title) {
            utils.sendJSONresponse(res, 404, { "message": "No title in request" });
            return;
        }
        if (!req.body.author) {
            utils.sendJSONresponse(res, 404, { "message": "No author in request" });
            return;
        }
        if (!req.body.price) {
            utils.sendJSONresponse(res, 404, { "message": "No price in request" });
            return;
        }
        // sanitation
        const title = req.body.title;
        const author = req.body.author;
        const price = req.body.price;
        return {
            title: title,
            author: author,
            price: price
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map