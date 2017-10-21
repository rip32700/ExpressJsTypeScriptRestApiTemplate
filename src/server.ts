import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import { Database } from "./models/db";
import { router } from "./routes/api";
import expressValidator = require("express-validator");


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

const port = process.env.PORT || 8000;

export class Server {

    public app: any;
    public db: Database;


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


    private configureMiddleware() {
        this.app.set("port", port);
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(expressValidator());

        // remove for production
        this.app.use(errorHandler());
    }

    private setupDatabase() {
        this.db = new Database(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        this.db.connect();
    }

    private addRoutes() {
        this.app.use("/api", router);
    }

    private launch() {
        this.app.listen(this.app.get("port"), () => {
            console.log(("App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
            console.log("Press CTRL-C to stop\n");
        });
    }
}


new Server();