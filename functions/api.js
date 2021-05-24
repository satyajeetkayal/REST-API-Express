const express = require("express");
const serverless = require("serverless-http");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();

const products = [
  {
    id: 1,
    title: "ADDIDAS",
  },
];

router.get("/", (req, res) => {
  res.send("Welcome to Express REST API");
});

router.get("/items", (req, res) => {
  res.send(products);
});

router.post("/items", (req, res) => {
  const product = {
    id: products.length + 1,
    title: req.body.title,
  };
  products.push(product);
  res.send(product);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.array());
app.use("/", router);

module.exports.handler = serverless(app);