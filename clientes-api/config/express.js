// requires
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require("config");
const router = require("../src/routes/routes");

module.exports = () => {
    // setup app
    const app = express();
    app.set("port", process.env.PORT || config.get("server.port"));

    // Middlewares
    app.use(morgan("dev"));
    app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.json({ type: "application/json" }));

    // Routes
    app.use(router);

    // Return app
    return app;
};
