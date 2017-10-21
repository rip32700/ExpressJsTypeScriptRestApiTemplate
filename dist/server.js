"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const db_1 = require("./models/db");
const api_1 = require("./routes/api");
const expressValidator = require("express-validator");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });
const port = process.env.PORT || 8000;
class Server {
    constructor() {
        // create app
        this.app = express();
        // configure
        this.configureMiddleware();
        // setup database
        this.setupDatabase();
        // add routes
        this.addRoutes();
        // eventually start
        this.launch();
    }
    configureMiddleware() {
        this.app.set("port", port);
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(expressValidator());
        // remove for production
        this.app.use(errorHandler());
    }
    setupDatabase() {
        this.db = new db_1.Database(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        this.db.connect();
    }
    addRoutes() {
        this.app.use("/api", api_1.router);
    }
    launch() {
        this.app.listen(this.app.get("port"), () => {
            console.log(("App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
            console.log("Press CTRL-C to stop\n");
        });
    }
}
exports.Server = Server;
new Server();
//# sourceMappingURL=server.js.map