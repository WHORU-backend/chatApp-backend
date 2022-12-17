require("dotenv").config();
const express = require("express");
require("express-async-errors");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const myDataSource = require("./models/db.config");
const errorHandler = require("./middlewares/errorHandler");

// DB 연결
myDataSource
  .initialize()
  .then(() => {
    console.log("DB Connection");
  })
  .catch((err) => {
    console.log(err);
  });

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(router);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };