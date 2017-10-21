import { Request, Response } from "express";
import * as utils from "../common/utils";
import { Book } from "../models/book.model";

export class BookController {

    public readAllBooks(req: Request, res: Response) {
        Book.find({ }, function(err: Error, books: any) {
            if (err) {
                utils.sendJSONresponse(res, 404, err);
            } else {
                utils.sendJSONresponse(res, 200, books);
            }
        });
    }

    public readOneBook(req: Request, res: Response) {
        if (!req.params || !req.params.bookId) {
            utils.sendJSONresponse(res, 404, { "message": "No book ID in request" });
            return;
        }
        const bookId = req.params.bookId;
        Book.findById(bookId)
            .exec(function callback(err: Error, book: any) {
                if (!book) {
                    utils.sendJSONresponse(res, 404, { "message": "transaction ID not found" });
                    return;
                } else if (err) {
                    utils.sendJSONresponse(res, 404, err);
                    return;
                }
                // success
                utils.sendJSONresponse(res, 200, book);
        });
    }

    public createOneBook(req: Request, res: Response) {
        const data = BookController.extractBookInformationFromRequest(req, res);
        Book.create(data, function callback(err: Error, book: any) {
            if (err) {
                utils.sendJSONresponse(res, 400, err);
            } else {
                utils.sendJSONresponse(res, 201, book);
            }
        });
    }

    private static extractBookInformationFromRequest(req: Request, res: Response) {
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