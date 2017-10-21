import  * as express from "express";
import { BookController } from "../controllers/book.controller";

const router = express["Router"]();

// load controllers
const bookController = new BookController();

// define the routes
router.get("/books", bookController.readAllBooks);
router.get("/books/:bookId", bookController.readOneBook);
router.post("/books", bookController.createOneBook);

export {
    router
};