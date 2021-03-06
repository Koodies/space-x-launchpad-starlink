const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const {getAllStarlinks} = require("./src/controllers/starlink")

const launchRouter = require("./routes/launchpad");
const starlinkRouter = require("./routes/starlink");

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/launchpad", launchRouter);
app.use("/starlink", starlinkRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

getAllStarlinks()

module.exports = app;
