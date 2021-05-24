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
  {
    id: 2,
    title: "REEBOK",
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

router.get("/items/:id", (req, res) => {
  var itemsData = products.filter((product) => {
    if (product.id == req.params.id) {
      return true;
    }
  });
  if (itemsData.length == 1) {
    res.json(itemsData[0]);
  } else {
    res.status(404);
    res.json({ message: "items Not Found" });
  }
});

router.delete("/items/:id", (req, res) => {
  var deleteItems = products
    .map((product) => {
      return product.id;
    })
    .indexOf(req.params.id);

  if (deleteItems === 1) {
    res.json({ message: "Not found" });
  } else {
    products.splice(deleteItems, 1);
    res.send({ message: "item id " + req.params.id + " removed." });
  }
});

router.put("/items/:id", (req, res) => {
  var updateItems = products
    .map(function (product) {
      return product.id;
    })
    .indexOf(parseInt(req.params.id));

  if (updateItems === -1) {
    products.push({
      id: req.params.id,
      title: req.params.title,
    });
    res.json({
      message: "New item created.",
      location: "/items/" + req.params.id,
    });
  } else {
    movies[updateItems] = {
      id: req.params.id,
      title: req.params.title,
    };
    res.json({
      message: "item id " + req.params.id + " updated.",
      location: "/items/" + req.params.id,
    });
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.array());
app.use("/", router);

module.exports.handler = serverless(app);
