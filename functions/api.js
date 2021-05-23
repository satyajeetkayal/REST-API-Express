const express = require("express");
const serverless = require("serverless-http");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.send("Welcome to Express REST API");
});

app.use("/", router);

module.exports.handler = serverless(app);
